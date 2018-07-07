require "csv"
require "news-api"
require "dotenv"

class NewsSniffer 

  def initialize 
    @newsapi = News.new(ENV["GOOGLE_NEWS_API"])
    @ice_facs = CSV.read("../docs/assets/data/iceFacs.csv", { headers: true })
  end

  def create_domains_by_state
    news_sources = CSV.read("../data/news-crawl-output.csv", {headers: true })
    states = news_sources.map{ |source| source["state"] }.uniq
    state_source_domains = states.map do |state|
      { state: state,
        sources: news_sources.select{ |news_source| news_source["state"] == state }.map{ |source|
          URI.parse(source["link"]).host.downcase.gsub(/^www\./, "")
        }
      }
    end
    File.open("../data/news-sources-by-state.json", "w") do |file|
      file.puts state_source_domains.to_json
    end
  end

end


