require "dotenv"
require "httparty"
require "csv"
require "./imgur"

api = ENV["GOOGLE_MAPS_API"]
# zoom = 19 # slightly bigger than single-apt-building view
zoom = 18 # slightly bigger than single-apt-building view

ice_centers = CSV.read("data/detCtrs-get-pix.csv", { headers: true })
# ice_centers = CSV.read("docs/assets/data/ice-facs_geocoded.csv", { headers: true })

# detention_centers.each do |center|
File.open("detctr.csv", "w") do |output|
  output.puts "filename,imgur"
  ice_centers.each do |center|
    lat = center["lat"].to_f
    lon = center["lon"].to_f
    # lat = center["Latitude"].to_f
    # lon = center["Longitude"].to_f
    unless lat == 0.0 && lon == 0.0
      latlng = "#{lat},#{lon}"
      filename = "#{center["DETLOC"]}.png"
      puts filename
      # puts "Getting image for #{lat}, #{lon} (#{center["Name"]})"
      response = HTTParty.get("https://maps.googleapis.com/maps/api/staticmap?center=#{latlng}&zoom=#{zoom}&size=640x640&maptype=satellite&key=#{api}")
      # puts "Saving image as sat-#{id}.png"
      File.open("localdata/#{filename}", "wb") do |f|
        f.write response.body
      end
      imgur_url = upload_image filename
      unless imgur_url
        refresh_token
        imgur_url = upload_image filename
      end
      output.puts "#{filename},#{imgur_url}"
      sleep 60
    end
  end
end

