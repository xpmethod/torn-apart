require "dotenv"
require "httparty"

class Landsat

  include HTTParty
  base_uri "earthexplorer.usgs.gov/inventory/json/v/latest"

  def initialize
    @options = { query: { jsonRequest: {} } }
    @api_key = get_api_key
  end

  def logout
    json_request({ apiKey: @api_key })
    handle "/logout"
  end

  private

  def get_api_key
    Dotenv.load # see .env.example
    json_request({
      username: ENV['USGS_USERNAME'],
      password: ENV['USGS_PASSWORD'],
      authType: "EROS",
      catalogId: "EE"
    })
    response = handle "/login"
    response[:data]
  end

  def handle(endpoint)
    response = JSON.parse self.class.get(endpoint, @options).body, symbolize_names: true
    if response[:errorCode].nil?
      response
    else
      raise APIError.new("Error: #{response[:error]}, Code: #{response[:errorCode]}")
    end
  end

  def json_request(hash)
    @options[:query][:jsonRequest] = hash.to_json
  end

  class APIError < StandardError ; end
end
