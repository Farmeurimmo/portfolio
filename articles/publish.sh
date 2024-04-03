#!/bin/bash

json=$1
id=$2
api_key=$(cat ../api_key)

curl -X POST https://api.farmeurimmo.fr/v1/blog/$id \
     -H "Content-Type: application/json" \
     -H "X-API-Key: $api_key" \
     -d "$json"

printf "\nDone\n"