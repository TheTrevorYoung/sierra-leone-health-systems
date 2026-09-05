#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_BASE = 'https://thetrevoryoung.github.io/sierra-leone-health-systems/'
PROJECT_PATH = '/sierra-leone-health-systems/'

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]
        self.h1=0
        self.title=''
        self._in_title=False
        self.meta_description=None
        self.meta_robots=None
        self.lang=None
        self.skip_link=False
        self.canonical=None
        self.og_url=None
        self.forms=0
        self.iframes=0
        self.runtime_scripts=[]
        self.stylesheets=[]
        self.external_anchor_issues=[]

    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag=='html':
            self.lang=attrs.get('lang')
        if tag=='a' and attrs.get('href'):
            href=attrs['href']
            self.links.append(href)
            if 'skip-link' in (attrs.get('class') or '').split():
                self.skip_link=True
            if href.startswith('http://'):
                self.external_anchor_issues.append(f'insecure external link: {href}')
            if href.startswith(('http://','https://')):
                rel=set((attrs.get('rel') or '').split())
                if not {'noopener','noreferrer'}.issubset(rel):
                    self.external_anchor_issues.append(f'external link missing noopener/noreferrer: {href}')
        if tag=='h1':
            self.h1 += 1
        if tag=='title':
            self._in_title=True
        if tag=='meta':
            name=attrs.get('name','').lower()
            prop=attrs.get('property','').lower()
            if name=='description':
                self.meta_description=attrs.get('content','').strip()
            elif name=='robots':
                self.meta_robots=attrs.get('content','').lower()
            if prop=='og:url':
                self.og_url=attrs.get('content','').strip()
        if tag=='link':
            rel=attrs.get('rel','').lower().split()
            if 'canonical' in rel:
                self.canonical=attrs.get('href','').strip()
            if 'stylesheet' in rel and attrs.get('href'):
                self.stylesheets.append(attrs['href'])
        if tag=='script' and attrs.get('src'):
            self.runtime_scripts.append(attrs['src'])
        if tag=='form':
            self.forms += 1
        if tag=='iframe':
            self.iframes += 1

    def handle_endtag(self, tag):
        if tag=='title':
            self._in_title=False

    def handle_data(self, data):
        if self._in_title:
            self.title += data


def expected_url(file: Path):
    rel=file.relative_to(ROOT).as_posix()
    if rel == '404.html':
        return None
    if rel == 'index.html':
        return PUBLIC_BASE
    if rel.endswith('/index.html'):
        return PUBLIC_BASE + rel[:-10]
    raise ValueError(f'unexpected public HTML path: {rel}')


def local_target(file: Path, link: str):
    clean=link.split('#',1)[0].split('?',1)[0]
    if not clean:
        return None
    if clean.startswith(PROJECT_PATH):
        clean=clean[len(PROJECT_PATH):]
        target=(ROOT/clean).resolve()
    elif clean.startswith('/'):
        return 'outside-project'
    else:
        target=(file.parent/clean).resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        return 'outside-project'
    if target.is_dir() or target.suffix=='':
        target=target/'index.html'
    return target

issues=[]
html_files=sorted(ROOT.rglob('*.html'))
public_urls=set()
for file in html_files:
    text=file.read_text(encoding='utf-8')
    parser=PageParser(); parser.feed(text)
    rel=file.relative_to(ROOT)
    is_404=(rel.as_posix()=='404.html')

    if parser.h1 != 1:
        issues.append(f'{rel}: expected 1 h1, found {parser.h1}')
    if not parser.title.strip():
        issues.append(f'{rel}: missing title')
    if not parser.meta_description:
        issues.append(f'{rel}: missing meta description')
    if parser.lang != 'en':
        issues.append(f'{rel}: expected html lang="en"')
    if not parser.skip_link:
        issues.append(f'{rel}: missing skip link')
    if parser.forms:
        issues.append(f'{rel}: forms are not permitted in the current Tier 1 public build')
    if parser.iframes:
        issues.append(f'{rel}: iframe found; review required before embedding third-party runtime content')
    if any(src.startswith(('http://','https://')) for src in parser.runtime_scripts):
        issues.append(f'{rel}: external runtime JavaScript dependency found')
    if any(src.startswith(('http://','https://')) for src in parser.stylesheets):
        issues.append(f'{rel}: external runtime stylesheet dependency found')
    for ext_issue in parser.external_anchor_issues:
        issues.append(f'{rel}: {ext_issue}')
    if any(bad in text for bad in ('localhost','127.0.0.1','file://')):
        issues.append(f'{rel}: local-development URL leaked into deployable content')

    if is_404:
        if not parser.meta_robots or 'noindex' not in parser.meta_robots:
            issues.append('404.html: missing noindex robots directive')
        if parser.canonical:
            issues.append('404.html: canonical URL should not be set on the error page')
    else:
        expected=expected_url(file)
        public_urls.add(expected)
        # Canonical/og:url are optional while the owned production domain is still TBD.
        # If present, they must point to the current public route.
        if parser.canonical and parser.canonical != expected:
            issues.append(f'{rel}: canonical mismatch: {parser.canonical!r} != {expected!r}')
        if parser.og_url and parser.og_url != expected:
            issues.append(f'{rel}: og:url mismatch: {parser.og_url!r} != {expected!r}')

    for link in parser.links:
        if link.startswith(('http://','https://','mailto:','#','tel:')):
            continue
        target=local_target(file,link)
        if target is None:
            continue
        if target == 'outside-project':
            issues.append(f'{rel}: link escapes project root: {link}')
        elif not target.exists():
            issues.append(f'{rel}: broken internal link: {link}')

# Structured data
for name in ('evidence.json','model.json','claims.json'):
    try:
        json.loads((ROOT/'data'/name).read_text(encoding='utf-8'))
    except Exception as exc:
        issues.append(f'data/{name}: invalid JSON: {exc}')

# Required Tier 1 deployment files
for required in ('robots.txt','sitemap.xml','.nojekyll','README.md','DEPLOY.md'):
    if not (ROOT/required).exists():
        issues.append(f'missing required deployment/governance file: {required}')

# Sitemap must cover every public HTML route exactly once and exclude 404.
try:
    sitemap_root=ET.parse(ROOT/'sitemap.xml').getroot()
    ns={'sm':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    sitemap_urls=[e.text.strip() for e in sitemap_root.findall('sm:url/sm:loc',ns) if e.text]
    if len(sitemap_urls) != len(set(sitemap_urls)):
        issues.append('sitemap.xml: duplicate URL entries found')
    if set(sitemap_urls) != public_urls:
        missing=sorted(public_urls-set(sitemap_urls))
        extra=sorted(set(sitemap_urls)-public_urls)
        if missing: issues.append(f'sitemap.xml: missing public URLs: {missing}')
        if extra: issues.append(f'sitemap.xml: unexpected URLs: {extra}')
except Exception as exc:
    issues.append(f'sitemap.xml: invalid XML or unreadable: {exc}')

robots=(ROOT/'robots.txt').read_text(encoding='utf-8') if (ROOT/'robots.txt').exists() else ''
expected_sitemap=f'Sitemap: {PUBLIC_BASE}sitemap.xml'
if expected_sitemap not in robots:
    issues.append(f'robots.txt: expected sitemap directive not found: {expected_sitemap}')

# Repository hygiene / obvious credential patterns.
for banned_name in ('.env','.env.local','.env.production'):
    if (ROOT/banned_name).exists():
        issues.append(f'sensitive environment file present: {banned_name}')
secret_markers=('ghp_','github_pat_','AIzaSy','BEGIN PRIVATE KEY','aws_secret_access_key')
for file in ROOT.rglob('*'):
    if not file.is_file() or '.git' in file.parts or file.resolve() == Path(__file__).resolve():
        continue
    if file.suffix.lower() in {'.png','.jpg','.jpeg','.webp','.gif','.zip','.pdf'}:
        continue
    try:
        text=file.read_text(encoding='utf-8')
    except Exception:
        continue
    for marker in secret_markers:
        if marker in text:
            issues.append(f'{file.relative_to(ROOT)}: possible credential marker detected: {marker}')

if issues:
    print('\n'.join(issues))
    sys.exit(1)
print(
    f'QA passed: {len(html_files)} HTML files; '
    f'{len(public_urls)} public URLs; links, headings, metadata, '
    '404 indexing, sitemap/robots, accessibility hooks, structured data, privacy/runtime hygiene and repository basics validated.'
)
