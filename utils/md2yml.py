#!/usr/bin/python3
# -*- coding: utf-8 -*-

import sys
import re
import yaml

materia = re.compile(r'{:\.btn}\s*(?:<i class=(?:"|\')(?P<icon>.*)(?:"|\')>\s*(?P<icon_text>.*)\s*<\/i>)?\s*\[(?:\((?P<codigos>.*?)\))?(?P<nombre>.*)\]\((?P<link>.*)\)')

def process(fi, fo):
    dict_file = []
    for line in fi:
        match = re.search(materia, line)
        if not match:
            continue
        dict_file.append({match.group('nombre'): {'link': match.group('link'), 'codigos': match.group('codigos'), 'icono': match.group('icon'), 'icono_txt': match.group('icon_text')}})
    
    documents = yaml.dump(dict_file, fo)
    
    

if __name__ == '__main__':
    if len(sys.argv) == 1:
        process(sys.stdin, sys.stdout)
    else:
        with open(sys.argv[1], 'r') as fi:
            with open(sys.argv[2], 'w') as fo:
                process(fi,fo)
