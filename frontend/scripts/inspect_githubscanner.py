import pathlib

p = pathlib.Path('src/pages/GitHubScanner.jsx')
text = p.read_text(encoding='utf-8')
idx = text.index('bg-white/5')
start = max(0, idx-40)
end = min(len(text), idx+80)
segment = text[start:end]
print('index', idx)
print('segment repr:', segment.encode('unicode_escape'))
print('segment:')
print(segment)
print('---')
for i in range(idx-10, idx+30):
    ch = text[i]
    print(f"{i:4d}: {repr(ch)} {ord(ch)}")
