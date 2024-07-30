#!/bin/bash

id="18-07-2024-dev-blog-3-build-a-skyblock-plugin"
file="$id.svelte"
title="Build a Skyblock Plugin (part 3): Inventory Sync System"
snippet="This article focuses on the inventory synchronization system within the Skyblock plugin, detailing the mechanics of managing player inventories across multiple servers."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
description="This article focuses on the inventory synchronization system within the Skyblock plugin, detailing the mechanics of managing player inventories across multiple servers."
published="18/07/2024 11h00"
views=97
date="2024-07-18"

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