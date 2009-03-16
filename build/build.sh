#!/bin/bash

cat ../src/jquery-1.3.1.min.js > ../lib/jga.js
cat ../src/jquery-ui-core-1.7.min.js >> ../lib/jga.js
cat ../src/jga.core.js >> ../lib/jga.js
cat ../src/jga.ui.js >> ../lib/jga.js

cat ../src/jquery-1.3.1.min.js > ../lib/jga-min.js
cat ../src/jquery-ui-core-1.7.min.js >> ../lib/jga-min.js
python jsmin.py <../src/jga.core.js >> ../lib/jga-min.js
python jsmin.py <../src/jga.ui.js >> ../lib/jga-min.js
