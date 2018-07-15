require "nokogiri"

Dir["../data/downloads/everything/html/*html"].map do |file|
  begin
    File.write file.gsub(/\/html\//, "/txt/").gsub(/html$/, "txt"), Nokogiri::HTML(File.read(file)).css("p").map{ |p| p.to_s.gsub(/<[^>]*>/, "") }.join("\n\n")
  rescue
    puts "some problem w/ #{file}"
  end
end
