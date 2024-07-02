#!/bin/bash

id="15-04-2024-dev-blog-2-build-a-skyblock-plugin"
file="$id.svelte"
title="Dev Blog #2: Build a Skyblock Plugin (part 2): Island System"
snippet="In this article I continue to talk about the development of my skyblock plugin. This time I will talk about the island system in cross server with island repartition, loading and saving islands."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
description="In this article I continue to talk about the development of my skyblock plugin. This time I will talk about the island system in cross server with island repartition, loading and saving islands."
published="16/04/2024 11h28"
views=110

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