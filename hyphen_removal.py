import json
with open("Poems.json", 'r', encoding='utf-8') as file:
    data = json.load(file)
    
for poem in data:
    poem['title'] = poem['title'].replace("-", " ").title()
    
with open("Poems.json", 'w', encoding='utf-8') as file:
    json.dump(data,file,ensure_ascii=False, indent=4)