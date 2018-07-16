# This goes through the directory "contains-keywords" and looks up the corresponding state for each domain in the filename and sorts into "state" folders.

import string
import os
import re
from shutil import copyfile

import csv

statedict = {}
filename = ""

#CREATES A DICTIONARY WITH DETLOCS AS KEYS AND STATES AS VALUES (would have liked to use domains and states from news articles spreadsheet, but the 'domains' as saved into these file names do not nearly match up with what's in that spreadsheet because of various things being stripped. And the childrens ones are problematic because they have been joined with hyphens.
with open('iceFacs.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        statedict[row['DETLOC']] = row['State']
    csvfile.close()

directory = os.fsencode("downloads/everything/contains-keywords") #this is where the text files are at

#for each file split the filename on "-" and get DETLOC (= first part before first hyphen)
for file in os.listdir(directory):
    filename = os.fsdecode(file)
    filepath = "downloads/everything/contains-keywords/" + filename
    fileparts = filename.split("-") #there should normally be three of these. Problematic for children's facilities since they were multiword items joined by - instead of detlocs
    DETLOC = fileparts[0]
    strState = statedict.get(DETLOC, "not found")
    path = "downloads/everything/contains-keywords" + "/bystate/" + strState

#CREATES FOLDER IF IT DOESN"T ALREADY EXIST
    if os.path.isdir(path) is False:
        os.mkdir(path)
        #print("created " + path)


#MOVE ALL THE THINGS
    destination = path + "/" + filename
  
    if strState is not "not found": #all the children's facilities are going to be 'not founds' and they are not going to move
        print(filepath + ", " + destination)
        copyfile(filepath, destination)
