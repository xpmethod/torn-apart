require "csv"
require "httparty"

articles = CSV.read(File.join("data", "state-articles.csv"), headers: true)
articles.to_a.shuffle.each_with_index do |row, i|
  filename = "#{row[0]}-#{row[2]}-#{i}.html"
  if File.exist?(File.join("data", "downloads", filename))
    puts "skipping #{filename}"
  else 
    begin 
      response = HTTParty.get(row[6])
      File.open(File.join("data", "downloads", filename),"w") { |file| file.write(response.body) }
      puts "#{row[0]}: #{row[2]}."
    rescue
      puts "Errored on index #{i} with #{row[6]}."
    end
  end
end

