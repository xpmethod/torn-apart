require "csv"
require "httparty"
require "dotenv"

class NewsSniffer 

  include HTTParty
  base_uri "newsapi.org/v2/"

  def initialize 
    @api_key = get_api_key
    @ice_facs = CSV.read("docs/assets/data/iceFacs.csv", { headers: true })
  end

  def detloc_report(detloc)
    dir = "data/news-sniffer-reports/#{detloc}" 
    Dir.mkdir dir unless File.exists? dir
    name = @ice_facs.select{|f| f["DETLOC"] == detloc}.first["Name"].downcase
    ["Massachusetts", "Rhode Island"].each do |state|
      hits = search_everything_in_state(name, state)
      puts "Searching for #{name} in #{state}"
      File.open("#{dir}/#{state}.json", "w") do |f|
        f.puts hits.to_json
      end
      sleep 20
    end
  end

  def search_everything_in_state(query, state)
    state_sources = sources_by_state[state]
    source_list = state_sources.join(",")
    if source_list.length < 1500
      search_everything({ q: query, domains: source_list })
    else
      sources_1 = state_sources[0..(state_sources.length / 2)].join(",")
      sources_2 = state_sources[(1 + state_sources.length / 2)..-1].join(",")
      first = search_everything({ q: query, domains: sources_1 })
      second = search_everything({ q: query, domains: sources_2 })
      { status: "ok", 
        totalResults: (first[:totalResults] + second[:totalResults]),
        articles: first[:articles] + second[:articles]
      }
    end
  end

  def search_everything(query_options)
    query_options[:pageSize] = 100
    @options = {
      query: query_options,
    }
    handle "/everything"
  end

  def sources_by_state
    news_sources = CSV.read("data/news-crawl-output.csv", {headers: true })
    sources = {}
    states = news_sources.map{ |source| source["state"] }.uniq
    states.map do |state|
      sources[state] = news_sources.select{ |news_source| news_source["state"] == state }.map{ |source|
          URI.parse(source["link"]).host.downcase.gsub(/^www\./, "")
        }
    end
    sources
  end

  def print_sources_by_state(file = "data/news-sources-by-state.json")
    File.open(file, "w") do |f|
      f.puts sources_by_state.to_json
    end
  end

  private

  def handle(endpoint)
    @options[:headers] = { "x-api-key" => @api_key }

    response = JSON.parse self.class.get(endpoint, @options).body, symbolize_names: true
    if response[:status] == "error"
      raise APIError.new("Error: #{response[:code]}, Msg: #{response[:message]}")
    else
      response
    end
  end

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


