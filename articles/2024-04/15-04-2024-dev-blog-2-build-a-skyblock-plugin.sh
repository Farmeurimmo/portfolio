#!/bin/bash

id="15-04-2024-dev-blog-2-build-a-skyblock-plugin"
file="$id.svelte"
title="Build a Skyblock Plugin (part 2): Island System"
snippet="This article delves into the Skyblock plugin's island system, focusing on cross-server compatibility, island distribution, and data management."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
published="16/04/2024 11h28"
views=351
date="2024-04-15"

# Read the content of the file
content=$(cat << EOF
$(cat $file)
EOF
)

# Escape newlines in the content
content=$(echo "$content" | sed 's/\\n/ /g' | sed 's/\\t/ /g')

# Create JSON object
json=$(jq -n \
          --arg id "$id" \
          --arg title "$title" \
          --arg snippet "$snippet" \
          --arg content "$content" \
          --arg img "$img" \
          --arg published "$published" \
          --argjson views "$views" \
          --arg date "$date" \
          '{id: $id, title: $title, snippet: $snippet, content: $content, img: $img, published: $published, views: $views, date: $date}')

sh ../publish.sh "$json" "$id"