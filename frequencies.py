import nltk
from nltk.tokenize import WordPunctTokenizer
from nltk.corpus import stopwords 
f = open('temp.txt', encoding = "utf8")
raw = f.read()
word_punct_tokenizer = WordPunctTokenizer()
tokens = word_punct_tokenizer.tokenize(raw)
clean_tokens = tokens[:]
clean_tokens = [t for t in tokens if not t in stopwords.words('english')]
freq = nltk.FreqDist(clean_tokens)
file = open('frequencies.txt', 'w', encoding = 'utf8')
for key, val in freq.items():
	file.write('\n' + str(key) + ":" + str(val))
file.close()
