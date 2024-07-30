#!/bin/bash

id="04-04-2024-dev-blog-1-build-a-skyblock-plugin"
file="$id.svelte"
title="Build a Skyblock plugin (part 1): Introduction"
snippet="This article outlines the development of a Minecraft Skyblock plugin for Spigot servers, starting with project goals and context."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
description="his article outlines the development of a Minecraft Skyblock plugin for Spigot servers, starting with project goals and context."
published="04/04/2024 21h00"
views=386
date="2024-04-04"

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