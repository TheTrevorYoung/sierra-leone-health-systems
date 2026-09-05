#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import json
import sys

ROOT = Path(__file__).resolve().parents[1]

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]; self.h1=0; self.title=''; self._in_title=False
        self.meta_description=None; self.lang=None; self.skip_link=False
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag=='html': self.lang=attrs.get('lang')
        if tag=='a' and attrs.get('href'):
            self.links.append(attrs['href'])
            if 'skip-link' in (attrs.get('class') or '').split(): self.skip_link=True
        if tag=='h1': self.h1 += 1
        if tag=='title': self._in_title=True
        if tag=='meta' and attrs.get('name','').lower()=='description':
            self.meta_description=attrs.get('content','').strip()
    def handle_endtag(self, tag):
        if tag=='title': self._in_title=False
    def handle_data(self, data):
        if self._in_title: self.title += data

issues=[]
html_files=sorted(ROOT.rglob('*.html'))
for file in html_files:
    text=file.read_text(encoding='utf-8')
    parser=PageParser(); parser.feed(text)
    rel=file.relative_to(ROOT)
    if parser.h1 != 1: issues.append(f'{rel}: expected 1 h1, found {parser.h1}')
    if not parser.title.strip(): issues.append(f'{rel}: missing title')
    if not parser.meta_description: issues.append(f'{rel}: missing meta description')
    if parser.lang != 'en': issues.append(f'{rel}: expected html lang="en"')
    if not parser.skip_link: issues.append(f'{rel}: missing skip link')
    if any(bad in text for bad in ('localhost','127.0.0.1','file://')):
        issues.append(f'{rel}: local-development URL leaked into deployable content')
    for link in parser.links:
        if link.startswith(('http://','https://','mailto:','#')): continue
        clean=link.split('#',1)[0].split('?',1)[0]
        if not clean: continue
        target=(file.parent/clean).resolve()
        try: target.relative_to(ROOT.resolve())
        except ValueError:
            issues.append(f'{rel}: link escapes repository: {link}'); continue
        if target.is_dir() or target.suffix=='': target=target/'index.html'
        if not target.exists(): issues.append(f'{rel}: broken internal link: {link}')

for name in ('evidence.json','model.json','claims.json'):
    try: json.loads((ROOT/'data'/name).read_text(encoding='utf-8'))
    except Exception as exc: issues.append(f'data/{name}: invalid JSON: {exc}')
for required in ('robots.txt','sitemap.xml','.nojekyll'):
    if not (ROOT/required).exists(): issues.append(f'missing required deployment file: {required}')

if issues:
    print('\n'.join(issues)); sys.exit(1)
print(f'QA passed: {len(html_files)} HTML files; links, headings, metadata, accessibility hooks, structured data and deployment files validated.')
