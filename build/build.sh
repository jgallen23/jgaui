#!/bin/bash

cd ~/code/jgaui/build

files=( external/jquery-1.3.1.min.js external/lowpro.jquery.js jga.core.js jga.ui.js plugins/pretty-print.js plugins/template.js plugins/tooltip.js )

rm ../lib/scripts/jga.js
rm ../lib/scripts/jga-min.js

for file in ${files[@]}
do
	cat ../src/scripts/$file >> ../lib/scripts/jga.js
	python jsmin.py <../src/scripts/$file >> ../lib/scripts/jga-min.js
done

