require "httparty"
require "dotenv"

class CompanyNameGetter

  include HTTParty
  base_uri "api.data.gov/sam/v4/"

  def initialize
    @api_key = get_api_key
  end

  def get_registration(duns)
    duns = "0#{duns}" if duns.length == 8
    duns = "00#{duns}" if duns.length == 7
    full_duns = "#{duns}0000"
    handle "/registrations/#{full_duns}"
  end

  private

  def handle(endpoint)

    @options = {
      query: {
        api_key: @api_key
      }
    }
    response = JSON.parse self.class.get(endpoint, @options).body, symbolize_names: true
    # unless response[:Error].nil?
    #   raise APIError.new("Error: #{response[:Code]}, Msg: #{response[:Message]}")
    # else
      response
    # end
  end

  def get_api_key
    Dotenv.load
    raise APIError.new("Missing API key in .env") if ENV["DATA_GOV_API"].nil?
    ENV["DATA_GOV_API"]
  end

  class APIError < StandardError ; end
end

# duns = File.read(File.join("..", "data", "duns_numbers.txt")).split("\n")[0..500]
# duns = File.read(File.join("..", "data", "duns_numbers.txt")).split("\n")
# duns = duns[501..duns.length - 1]
duns = ["26173034", "133090261", "246787951", "602667839", "610626798", "841284099"]
list = CompanyNameGetter.new
results = duns.map.with_index do |d, i|
  sleep 10
  # sleep 20
  result = list.get_registration d
  result[:excel_duns] = d
  if result[:Code].nil?
    puts "#{i}: #{result[:sam_data][:registration][:legalBusinessName]}"
  else
    puts "#{i}: #{result[:Code]}"
  end
  result
end
File.open("duns-#{Time.now.to_s.gsub(/:/, ".").gsub(/ [^ ]*$/, "").gsub(/ /, "-")}.json", "w") do |f|
  f.write results.to_json
end
