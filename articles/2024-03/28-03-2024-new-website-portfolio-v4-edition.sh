#!/bin/bash

id="28-03-2024-new-website-portfolio-v4-edition"
file="$id.svelte"
title="New website with portfolio in his 4 version"
snippet="In this article I will talk about the motivations behind my new website in his 4 version, the tech choices (Svelte+Vite+Tailwindcss) I made and the features I added (contact form, blog, multi language, etc..)."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
published="28/03/2024 21h00"
description="In this article I will talk about the motivations behind my new website in his 4 version, the tech choices (Svelte+Vite+Tailwindcss) I made and the features I added (contact form, blog, multi language, etc..)."
views=111

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
          --arg description "$description" \
          '{id: $id, title: $title, snippet: $snippet, content: $content, img: $img, published: $published, views: $views, description: $description}')

sh ../publish.sh "$json" "$id"