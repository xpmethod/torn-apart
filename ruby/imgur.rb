require 'httparty'
require 'yaml'

def get_configs
  @configs = YAML.load_file('imgur_config.yml')
end

def upload_image(filename)
  get_configs
  response = HTTParty.post 'https://api.imgur.com/3/upload',
    :headers => { 'Authorization' => "Bearer #{@configs[:imgur_access_token]}" },
    :body => { 'image' => Base64.encode64(File.read("localdata/#{filename}")) }
  response['data']['link']
end

def refresh_token
  puts "Refreshing token."
  get_configs
  response = HTTParty.post 'https://api.imgur.com/oauth2/token',
    :body => {
      'refresh_token' => @configs[:imgur_refresh_token],
      'client_id' => @configs[:imgur_client_id],
      'client_secret' => @configs[:imgur_client_secret],
      'grant_type' => 'refresh_token'
    }
  @configs[:imgur_access_token] = response['access_token']
  @configs[:imgur_refresh_token] = response['refresh_token']
  File.open('imgur_config.yml', 'w') do |file|
    file.puts YAML::dump(@configs)
  end
end
