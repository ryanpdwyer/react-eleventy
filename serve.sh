#!/bin/sh
npx babel -d _site/js js --watch --source-maps &
BABEL_PID=$!
echo "Babel process: $BABEL_PID"
trap "kill $BABEL_PID" INT
npx eleventy --serve