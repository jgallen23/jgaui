#!/bin/bash

cat ../src/scripts/jquery-1.3.1.min.js > ../lib/scripts/jga.js
cat ../src/scripts/jga.core.js >> ../lib/scripts/jga.js
cat ../src/scripts/jga.widget.js >> ../lib/scripts/jga.js
cat ../src/scripts/jga.ui.js >> ../lib/scripts/jga.js

cat ../src/scripts/jquery-1.3.1.min.js > ../lib/scripts/jga-min.js
python jsmin.py <../src/scripts/jga.core.js >> ../lib/scripts/jga-min.js
python jsmin.py <../src/scripts/jga.widget.js >> ../lib/scripts/jga-min.js
python jsmin.py <../src/scripts/jga.ui.js >> ../lib/scripts/jga-min.js
