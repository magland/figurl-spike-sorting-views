#!/bin/bash

set -ex

TARGET=gs://figurl/spike-sorting-views-1dev

yarn build
gsutil -m cp -R ./build/* $TARGET/