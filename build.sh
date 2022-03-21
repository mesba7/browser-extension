#!/bin/bash

build() {
    echo 'building react'

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false


    cp -r build/* dist
    cp -r ./images ./dist
    cp ./manifest.json dist/manifest.json
    mv dist/index.html dist/popup.html
}

build
