files=("che120q*.pdf");
for f in $files; do
    /Applications/Inkscape.app/Contents/MacOS/inkscape  "$f" -o "${f%.*}".svg
done