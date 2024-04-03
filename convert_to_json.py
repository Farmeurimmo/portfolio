import json

article_content = """
<h1 class="font-bold 4xl">Content</h1>
"""

json_object = {
    "content": article_content
}

# Write the JSON object to a file
with open('article.json', 'w') as f:
    json.dump(json_object, f)