import nltk
import string
from nltk.tokenize import WordPunctTokenizer
from nltk.corpus import stopwords

f = open('temp.txt', encoding = "utf8")
raw = f.read()

def getFrequences(str):
        word_punct_tokenizer = WordPunctTokenizer()
        tokens = word_punct_tokenizer.tokenize(raw)
        print("tokenized")
        clean_tokens = tokens[:]
        stop = stopwords.words('english') + list(string.punctuation)
        clean_tokens = [t for t in tokens if not t in stop]
        print("removed stopwords")
        freq = nltk.FreqDist(clean_tokens)
        return freq;


freq = getFrequences(raw)
print("got frequencies")
        
file = open('frequencies.txt', 'w', encoding = 'utf8')
for key, val in freq.items():
	file.write('\n' + str(key) + ":" + str(val))
print("wrote to file")
file.close()
