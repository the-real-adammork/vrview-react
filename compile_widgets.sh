#!/bin/bash

echo "Compiling all widgets for production"

rm -rf builds
mkdir -p builds
for filename in widgets/*.json; do
    echo "$filename"
    jsonName=${filename/widgets/}
    widgetName=${jsonName/\.json/}
    cat $filename | python -m json.tool  >> /dev/null && echo "Valid JSON" || echo "NOT valid JSON";
    cp $filename src/scenes/scenes.json
    echo "Building for ${widgetName}"
    yarn build
    #rm -rf build/images
    #rm -rf build/video
    buildFolderName="${widgetName}_build"
    mv build builds/$buildFolderName
done

#mkdir builds/sharedPublic
#cp -r public builds/sharedPublic