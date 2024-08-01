#!/bin/bash

id="28-03-2024-new-website-portfolio-v4-edition"
file="$id.svelte"
title="New website with portfolio in his 4 version"
snippet="This article explores the motivations, tech stack (Svelte, Vite, Tailwind CSS), and features (contact form, blog, multilingual) of my fourth website."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
published="28/03/2024 21h00"
description="This article explores the motivations, tech stack (Svelte, Vite, Tailwind CSS), and features (contact form, blog, multilingual) of my fourth website."
views=279
date="2024-03-28"

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
          --arg date "$date" \
          '{id: $id, title: $title, snippet: $snippet, content: $content, img: $img, published: $published, views: $views, description: $description, date: $date}')

sh ../publish.sh "$json" "$id"