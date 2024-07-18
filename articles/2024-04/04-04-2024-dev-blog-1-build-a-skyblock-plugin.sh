#!/bin/bash

id="04-04-2024-dev-blog-1-build-a-skyblock-plugin"
file="$id.svelte"
title="Dev blog #1: Build a Skyblock plugin (part 1): Introduction"
snippet="In this article I will talk about minecraft and how to build a Skyblock plugin for a Spigot server. In this first part we will talk about what we want to achieve and how we will do it."
img="https://cdn.farmeurimmo.fr/img/blog/$id.jpeg"
description="How to build a Skyblock plugin for a Spigot server. In this first part we will talk about what we want to achieve and how to handle cross server."
published="04/04/2024 21h00"
views=180
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