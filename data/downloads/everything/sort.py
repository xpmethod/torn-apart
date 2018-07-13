# This goes through the directory "txt" and searches the files in it for false positives/ truly relevant articles, then sorts into respective folders.

import string
import os
import re
from shutil import copyfile

secondaryKeywords = ['detention', 'detain', 'children', 'families', 'Mexico', 'Trump', 'protest', 'border', 'facilit'] #these are ones which by themselves might not be indicative of a match, but if there's multiple, it's more likely.

directory = os.fsencode("txt") #this is where the text files are

global iPositives
iPositives = 0
global iNegatives
iNegatives = 0

def findKeywords(str):  #here we test to see what keywords the text in question contains

    iCount = 0
    for keyword in secondaryKeywords: #testing to see whether secondary keywords are in a file, and incrementing the iCount counter for each one that is.
        if re.search(keyword, str) is not None:
        #    print(keyword)
            iCount = iCount + 1
        

    if re.search('((?i)(refugee|immigration|asylum))', str) is not None:    #any one of these keywords means the article is relevant. 
        return True;
    elif re.search('(?i)\bICE\b', str) is not None: #if " ICE " is there as a single capitalised word, it's relevant.
        return True;
    elif iCount > 3: #if more than 3 of the other terms are present, it's relevant. Can play with this number to get stricter or less strict about false positives
        return True;
    else:
        return False;

for file in os.listdir(directory): #for each file, test for keywords, and move into a new folder if they are there.
    filename = os.fsdecode(file)
    #print(filename)
    filepath = 'txt/' + filename
    file = open(filepath, encoding = "utf8")
    raw = file.read()
 
    if (findKeywords(raw) is True):
        destination = 'contains-keywords/' + filename 
        copyfile(filepath, destination)
        iPositives = iPositives+1 #increment this number to keep track of how many files we have detected and moved
    else:
        iNegatives = iNegatives+1 #increment this number to keep track of how many false positives we identified
        destination = 'false-positives/' + filename
        copyfile(filepath, destination)
    file.close()

print("Total real articles = " + str(iPositives) + "; Total false positives = " + str(iNegatives))
