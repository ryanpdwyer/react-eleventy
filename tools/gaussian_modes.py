#!/usr/bin/env python3
"""Extract geometry + normal modes from a Gaussian freq=(hpmodes[,raman]) log as JSON for dce-torsion.html.

    python3 gaussian_modes.py apfd-anti.log anti > anti-modes.json
"""
import json, re, sys

SYM = {1:'H',6:'C',17:'Cl'}

def parse(path, tag):
    L = open(path).read().splitlines()
    # last standard orientation (frequencies refer to it)
    starts = [i for i,l in enumerate(L) if 'Standard orientation' in l]
    i = starts[-1] + 5
    xyz = []
    while not L[i].startswith(' ----'):
        f = L[i].split(); xyz.append([SYM[int(f[1])], float(f[3]), float(f[4]), float(f[5])]); i += 1
    n = len(xyz)
    # high-precision block: first 'Harmonic frequencies' section with 'Frequencies ---'
    modes = []
    i = next(k for k,l in enumerate(L) if 'Harmonic frequencies' in l)
    while i < len(L) and 'Frequencies --' not in L[i] or (i < len(L) and 'Frequencies ---' in L[i]):
        if 'Frequencies ---' in L[i]:
            freqs = [float(x) for x in L[i].split('---')[1].split()]
            block = {}
            j = i + 1
            while 'Coord Atom Element' not in L[j]:
                key, vals = L[j].split('---'); block[key.strip()] = [float(x) for x in vals.split()]; j += 1
            j += 1
            disp = [[[0.0,0.0,0.0] for _ in range(n)] for _ in freqs]
            for _ in range(3*n):
                f = L[j].split(); c, a = int(f[0])-1, int(f[1])-1
                for m,v in enumerate(f[3:]): disp[m][a][c] = float(v)
                j += 1
            for m,fr in enumerate(freqs):
                modes.append({'name': f'{tag}', 'freq': fr,
                              'ir': block.get('IR Intensities',[0]*len(freqs))[m],
                              'raman': block.get('Raman Activities',[None]*len(freqs))[m],
                              'redmass': block.get('Reduced masses',[0]*len(freqs))[m],
                              'xyz': xyz, 'disp': disp[m]})
            i = j
        else:
            i += 1
        if i < len(L) and 'Frequencies --' in L[i] and 'Frequencies ---' not in L[i]:
            break
    return modes

if __name__ == '__main__':
    print(json.dumps(parse(sys.argv[1], sys.argv[2] if len(sys.argv)>2 else '')))
