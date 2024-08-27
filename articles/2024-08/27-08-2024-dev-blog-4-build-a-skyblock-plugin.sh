#!/bin/bash

id="27-08-2024-dev-blog-4-build-a-skyblock-plugin"
file="$id.svelte"
title="Build a Skyblock Plugin (part 4): Cross server auctions"
snippet="This article explores the Skyblock plugin's auction system, detailing how players can sell and buy items across servers."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
published="27/08/2024 11h00"
views=0
date="2024-08-27"

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