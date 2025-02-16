import json

with open("./JsonFiles/Poems.json", 'r+', encoding='utf-8') as file:
    data = json.load(file)
    count = 0
    for item in data:
        item['id'] = count
        item['like'] = False
        count += 1
    
    file.seek(0)
    json.dump(data, file, indent=4, ensure_ascii=False)
    file.truncate()
    