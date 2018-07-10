require "csv"
require "httparty"

CSV.foreach('data/state-articles.csv', :headers => true) do |row|
  response = HTTParty.get(row[6])
  rownumber = $.
  filename = "article-#{rownumber}.html"
  File.open("data/downloads/#{filename}","w+") { |file| file.write(response.body) }
  puts "Saved file " + filename + " in data/downloads folder."
end

