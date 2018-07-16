'''
This goes through all the state-by-state directories that I sorted the "everything" texts into (after they were cleaned of false positives.
It concatenates the files in a state's folder into a single string, lower-cases it, and removes punctuation.
Then it searches it for common collocates of the search term in "strSearchterm". These are not necessarily IMMEDIATELY adjacent - iWindow determines max distance.
The collocates for the term for all the states are printed to a text file, which you can then open as csv and play with for data visualisation purposes.
I have been sorting by number (1-10) so all most frequent collocates for all states can be compared, then all second-most frequent, etc.
If you append ", USA" to the state abbreviations in the first column, Google maps can even automatically display the results nicely on "My Maps"
which is good for a quick and dirty look at the data.

Another thing we could try is removing very common collocates that many states have (e.g. for "detention" most have "facility" as #1)
and looking for each state's most frequent unique collocate. 
we could also try tagging the text for POS and then looking at just adjective collocates, or noun collocates or verb collocates too.
'''

import nltk
from nltk import ngrams
from nltk.collocations import *
import string
import os

i = 2 # how many times a word must appear in corpus before it bothers examining it.
iNumberReturned = 10 #only this many collocations will be returned (from most to least frequent)
iWindow = 15 # looks at iWindow-grams, e.g. if this is 6, looks at collocations that occur within six words of each other.
bigram_measures = nltk.collocations.BigramAssocMeasures()
strSearchterm = "refugee" #this should be lower case, because I lower-cased the whole text

strState = ""

#for each state's folder, do the thing
maindirectory = os.fsencode("contains-keywords/bystate") 
for folder in os.listdir(maindirectory):
    strState = os.fsdecode(folder)
    

    #OPENS ALL FILES IN THE DIRECTORY AND PROGRESSIVELY APPENDS TEXT TO "sText" STRING
    sText = ""
    directory = os.fsencode("contains-keywords/bystate/" + strState)
    for f in os.listdir(directory):
        filename = "contains-keywords/bystate/" + strState + "/" + os.fsdecode(f)
        file = open(filename, encoding = "utf8")#this is a test file for now. Replace with file of your choice. Plan is to concatenate all files for a county or state, and then do this for each and compare. (see what words are the most interesting. Maybe not immigrant)
        #print(sText)
        sText = sText + file.read()
        file.close()
    #print(sText)


    sPunct_free_text = ' '.join(word.strip(string.punctuation) for word in sText.split())
    print(strState + ": " + "removed punctuation")

    sPunct_free_text = sPunct_free_text.lower() #makes lower case
    print(strState + ": " +"made lower case")

    lSplit = sPunct_free_text.split()#splits text into a list of words
    print(strState + ": " +"split text")

    #THIS DOES ALL FREQUENT COLLOCATES
    finder = BigramCollocationFinder.from_words(lSplit, window_size = iWindow) #looks at iWindow-grams(?)
    print(strState + ": " +"initialised finder")
    finder.apply_freq_filter(i) #words must turn up at least i number of times
    print(strState + ": " +"applied freq filter")

    ignored_words = nltk.corpus.stopwords.words('english') #ignores words like "the", "a" etc
    finder.apply_word_filter(lambda w: len(w) < 3 or w.lower() in ignored_words)
    print(strState + ": " +"dealt with stopwords")


    ###########if you want all frequent collocates comment this next bit out.
    #ngrams with 'searchterm' as a member
    word_filter = lambda *w: strSearchterm not in w
    finder.apply_ngram_filter(word_filter)
    print("limited to keywords")
    ############


    lCollocates = finder.nbest(bigram_measures.likelihood_ratio, iNumberReturned) # gets us the top iNumberReturned most frequent collocations
    print(strState + ": " +"found some collocates") #This might be a lie. I don't actually check whether I found any before printing this.

    outputfilename = strSearchterm + 'collocates.txt'
    outputfile = open(outputfilename, 'a', encoding = 'utf8')
    inc = 0
    for collocate in lCollocates:
        inc = inc + 1 #so that if we reorder them later, we know which was the most frequent for each state.
        outputfile.write('\n' + strState + "\t" +  str(inc) + "\t" + ','.join(collocate))
    print(strState + ": " +"wrote to file")
    outputfile.close()
    
    
    



