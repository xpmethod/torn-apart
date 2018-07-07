require "csv"
require "news-api"
require "dotenv"

newsapi = News.new(ENV["GOOGLE_NEWS_API"])

ice_facs = CSV.read("../docs/assets/data/iceFacs.csv", { headers: true })
news_sources = CSV.read("../data/news-crawl-output.csv", {headers: true })
states = news_sources.map{ |source| source["state"] }.uniq
state_source_domains = states.map do |state|
  news_sources.select{ |news_source| news_source["state"] == state }.map do |source|
    URI.parse(source["link"]).host.downcase.gsub(/^www\./, "")
  end
end
puts state_source_domains

