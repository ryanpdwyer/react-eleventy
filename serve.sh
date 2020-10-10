#!/bin/zsh
fname=`print *(.om[1])`
npx babel -d _site/js js --watch --source-maps &
BABEL_PID=$!
echo "Babel process: $BABEL_PID"
npx eleventy --serve &
NPX_PID=$!
echo "Npx process: $NPX_PID"
cntr_c() {
    kill $NPX_PID
    kill $BABEL_PID
    exit
}
trap cntr_c INT
sleep 5 && open "http://localhost:8080/${fname%.*}/"
while :
do
    sleep 1000000
done 