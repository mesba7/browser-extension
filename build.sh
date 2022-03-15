#!/bin/bash

build() {
    echo 'building react'

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false


    cp -r build/* dist

    mv dist/index.html dist/popup.html
}

build
