require "csv"
require "httparty"
require "dotenv"

class NewsSniffer 

  include HTTParty
  base_uri "newsapi.org/v2/"

  def initialize 
    @api_key = get_api_key
    # @ice_facs = CSV.read("../docs/assets/data/iceFacs.csv", { headers: true })
  end

  def sources_by_state
    news_sources = CSV.read("data/news-crawl-output.csv", {headers: true })
    states = news_sources.map{ |source| source["state"] }.uniq
    state_source_domains = states.map do |state|
      { state: state,
        sources: news_sources.select{ |news_source| news_source["state"] == state }.map{ |source|
          URI.parse(source["link"]).host.downcase.gsub(/^www\./, "")
        }
      }
    end
    state_source_domains
  end

  def print_sources_by_state(file = "data/news-sources-by-state.json")
    File.open(file, "w") do |f|
      f.puts sources_by_state.to_json
    end
  end

  private

  def get_api_key
    Dotenv.load
    raise APIError.new("Missing API key in .env") if ENV["GOOGLE_NEWS_API"].nil?
    ENV["GOOGLE_NEWS_API"]
  end

  class APIError < StandardError ; end
end


