import nltk
from nltk import ngrams
from nltk.collocations import *
import string

f = open('temp.txt', encoding = "utf8") #this is a test file for now. Replace with file of your choice. Plan is to concatenate all files for a county or state, and then do this for each and compare. (see what words are the most interesting. Maybe not immigrant)
sText = f.read()

i = 2 # how many times a word must appear in corpus before it bothers examining it.
iNumberReturned = 10 #only this many collocations will be returned (from most to least frequent)
iWindow = 10 # looks at iWindow-grams, e.g. if this is 6, looks at collocations that occur within six words of each other.
bigram_measures = nltk.collocations.BigramAssocMeasures()

#REMOVE PUNCTUATION
sPunct_free_text = ' '.join(word.strip(string.punctuation) for word in sText.split())
print("removed punctuation")

sPunct_free_text = sPunct_free_text.lower() #makes lower case
print("made lower case")

lSplit = sPunct_free_text.split()#splits text into a list of words
print("split text")

#THIS DOES ALL FREQUENT COLLOCATES
finder = BigramCollocationFinder.from_words(lSplit, window_size = iWindow) #looks at iWindow-grams(?)
print("initialised finder")
finder.apply_freq_filter(i) #words must turn up at least i number of times
print("applied freq filter")

ignored_words = nltk.corpus.stopwords.words('english') #ignores words like "the", "a" etc
finder.apply_word_filter(lambda w: len(w) < 3 or w.lower() in ignored_words)
print("dealt with stopwords")

###########if you want all frequent collocates comment this next bit out.
#ngrams with 'immigrant' as a member
word_filter = lambda *w: "immigrant" not in w
finder.apply_ngram_filter(word_filter)
print("limited to keywords")
############


lCollocates = finder.nbest(bigram_measures.likelihood_ratio, iNumberReturned) # gets us the top iNumberReturned most frequent collocations


#ALTERNATIVELY, THIS DOES COLLOCATES OF SPECIFIC WORDS
#we could also try tagging the text for POS and then looking at just adjective collocates, or noun collocates or verb collocates too.

for collocate in lCollocates:
    print(collocate)



