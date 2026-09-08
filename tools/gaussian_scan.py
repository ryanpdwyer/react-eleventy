#!/usr/bin/env python3
"""Relaxed-scan points from a Gaussian Opt(ModRedundant) log: dihedral, energy (hartree), geometry.

    python3 gaussian_scan.py scan.log 1 2 3 4 > scan.json     # atom numbers of the scanned dihedral
"""
import json, sys, math
SYM = {1:'H',6:'C',17:'Cl'}

def dihedral(p0,p1,p2,p3):
    import numpy as np
    b0=np.array(p0)-np.array(p1); b1=np.array(p2)-np.array(p1); b2=np.array(p3)-np.array(p2)
    b1/=np.linalg.norm(b1); v=b0-np.dot(b0,b1)*b1; w=b2-np.dot(b2,b1)*b1
    return math.degrees(math.atan2(np.dot(np.cross(b1,v),w), np.dot(v,w)))

def parse(path, idx):
    L=open(path).read().splitlines(); pts=[]; geom=None; E=None
    i=0
    while i<len(L):
        l=L[i]
        if 'Input orientation' in l or 'Standard orientation' in l:
            j=i+5; g=[]
            while not L[j].startswith(' ----'):
                f=L[j].split(); g.append([SYM[int(f[1])],float(f[3]),float(f[4]),float(f[5])]); j+=1
            geom=g; i=j
        elif 'SCF Done' in l:
            E=float(l.split('=')[1].split()[0])
        elif 'Optimization completed' in l:
            a=[geom[k-1][1:] for k in idx]
            pts.append({'phi':round(dihedral(*a),3),'E':E,'xyz':[[s,round(x,5),round(y,5),round(z,5)] for s,x,y,z in geom]})
        i+=1
    return pts

if __name__=='__main__':
    print(json.dumps(parse(sys.argv[1],[int(x) for x in sys.argv[2:6]])))
