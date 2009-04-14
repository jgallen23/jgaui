#!/bin/bash

cat ../src/scripts/jquery-1.3.1.min.js > ../lib/scripts/jga.js
cat ../src/scripts/jquery-ui-core-1.7.min.js >> ../lib/scripts/jga.js
cat ../src/scripts/jga.core.js >> ../lib/scripts/jga.js
cat ../src/scripts/jga.ui.js >> ../lib/scripts/jga.js

cat ../src/scripts/jquery-1.3.1.min.js > ../lib/scripts/jga-min.js
cat ../src/scripts/jquery-ui-core-1.7.min.js >> ../lib/scripts/jga-min.js
python jsmin.py <../src/scripts/jga.core.js >> ../lib/scripts/jga-min.js
python jsmin.py <../src/scripts/jga.ui.js >> ../lib/scripts/jga-min.js
