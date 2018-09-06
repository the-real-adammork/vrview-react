#!/bin/bash

filename=widgets/$1.json
cat $filename | python -m json.tool  >> /dev/null && echo "Valid JSON" || echo "NOT valid JSON"
echo $filename
cp $filename src/scenes/scenes.json
yarn start
