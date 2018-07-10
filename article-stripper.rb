require "nokogiri"

Dir["data/downloads/*html"].map do |file|
  File.write file.gsub(/html$/, "txt"), Nokogiri::HTML(File.read(file)).css("p").map{ |p| p.to_s.gsub(/<[^>]*>/, "") }.join("\n\n")
end
