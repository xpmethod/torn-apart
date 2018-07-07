require "csv"
require "httparty"
require "dotenv"

class NewsSniffer 

  include HTTParty
  base_uri "newsapi.org/v2/"

  def initialize 
    @api_key = get_api_key
    @states = states
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

  def states
    [
      { name: "Alabama", abbreviation: "AL" },
      { name: "Alaska", abbreviation: "AK" },
      { name: "Arizona", abbreviation: "AZ" },
      { name: "Arkansas", abbreviation: "AR" },
      { name: "California", abbreviation: "CA" },
      { name: "Colorado", abbreviation: "CO" },
      { name: "Connecticut", abbreviation: "CT" },
      { name: "Delaware", abbreviation: "DE" },
      { name: "Florida", abbreviation: "FL" },
      { name: "Georgia", abbreviation: "GA" },
      { name: "Hawaii", abbreviation: "HI" },
      { name: "Idaho", abbreviation: "ID" },
      { name: "Illinois", abbreviation: "IL" },
      { name: "Indiana", abbreviation: "IN" },
      { name: "Iowa", abbreviation: "IA" },
      { name: "Kansas", abbreviation: "KS" },
      { name: "Kentucky", abbreviation: "KY" },
      { name: "Louisiana", abbreviation: "LA" },
      { name: "Maine", abbreviation: "ME" },
      { name: "Maryland", abbreviation: "MD" },
      { name: "Massachusetts", abbreviation: "MA" },
      { name: "Michigan", abbreviation: "MI" },
      { name: "Minnesota", abbreviation: "MN" },
      { name: "Mississippi", abbreviation: "MS" },
      { name: "Missouri", abbreviation: "MO" },
      { name: "Montana", abbreviation: "MT" },
      { name: "Nebraska", abbreviation: "NE" },
      { name: "Nevada", abbreviation: "NV" },
      { name: "New Hampshire", abbreviation: "NH" },
      { name: "New Jersey", abbreviation: "NJ" },
      { name: "New Mexico", abbreviation: "NM" },
      { name: "New York", abbreviation: "NY" },
      { name: "North Carolina", abbreviation: "NC" },
      { name: "North Dakota", abbreviation: "ND" },
      { name: "Ohio", abbreviation: "OH" },
      { name: "Oklahoma", abbreviation: "OK" },
      { name: "Oregon", abbreviation: "OR" },
      { name: "Pennsylvania", abbreviation: "PA" },
      { name: "Rhode Island", abbreviation: "RI" },
      { name: "South Carolina", abbreviation: "SC" },
      { name: "South Dakota", abbreviation: "SD" },
      { name: "Tennessee", abbreviation: "TN" },
      { name: "Texas", abbreviation: "TX" },
      { name: "Utah", abbreviation: "UT" },
      { name: "Vermont", abbreviation: "VT" },
      { name: "Virginia", abbreviation: "VA" },
      { name: "Washington", abbreviation: "WA" },
      { name: "West Virginia", abbreviation: "WV" },
      { name: "Wisconsin", abbreviation: "WI" },
      { name: "Wyoming ", abbreviation: "WY" }
    ]
  end

  class APIError < StandardError ; end
end


