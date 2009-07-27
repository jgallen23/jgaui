#!/usr/bin/env python

import os
import jsmin

pwd = os.path.dirname(os.path.abspath(__file__))
os.chdir(pwd)

js = {
    'jga': {
        'version': '1.01',
        'files': (
            'external/jquery-1.3.2.min.js',
            'external/lowpro.jquery.js',
            'jga.core.js',
            'jga.ui.js',
            'utilities/arrays.js',
            'plugins/prettydate.js',
            'plugins/template.js',
            'plugins/tooltip.js'
        )
    },
    'datepicker': {
        'version': '1.0',
        'files': (
            'external/date.js',
            'external/jquery.datePicker.js',
        )
    },
    'cookies': {
        'version': '1.0',
        'files': (
            'utilities/cookies.js',
        )
    },
    'sitelife': {
        'version': '1.0',
        'files': (
            'plugins/sitelife.js',
        )
    },
}

css = {
    'datepicker': {
        'version': '1.0',
        'files': (
            'external/datePicker.css',
        )
    }
}


for profile in js:
    files = js[profile]["files"]
    data = { "name": profile, "version": js[profile]["version"] }
    path = "../lib/scripts/%(name)s-%(version)s.js" % data 
    min_path = "../lib/scripts/%(name)s-%(version)s.min.js" % data
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(min_path):
        os.remove(min_path)
    for file in files:
        d = { "file": file, "path": path, "min_path": min_path }
        os.system("cat ../src/scripts/%(file)s >> %(path)s" % d)
        os.system("python jsmin.py <../src/scripts/%(file)s >> %(min_path)s" % d)

for profile in css:
    files = css[profile]["files"]
    data = { "name": profile, "version": css[profile]["version"] }
    path = "../lib/stylesheets/%(name)s-%(version)s.css" % data
    min_path = "../lib/stylesheets/%(name)s-%(version)s.min.css" % data
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(min_path):
        os.remove(min_path)
    for file in files:
        d = { "file": file, "path": path, "min_path": min_path }
        os.system("cat ../src/stylesheets/%(file)s >> %(path)s" % d)
        os.system("python cssmin.py ../src/stylesheets/%(file)s >> %(min_path)s" % d)

