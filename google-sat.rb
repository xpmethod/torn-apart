require "dotenv"
require "httparty"
require "csv"

api = ENV["GOOGLE_MAPS_API"]
# zoom = 19 # slightly bigger than single-apt-building view
zoom = 18 # slightly bigger than single-apt-building view

# detention_centers = CSV.read("data/detention.csv", { headers: true })
ice_centers = CSV.read("docs/web-data/ice-facs_geocoded.csv", { headers: true })

# detention_centers.each do |center|
ice_centers.each do |center|
  lat = center["lat"].to_f
  lon = center["lon"].to_f
  # lat = center["Latitude"].to_f
  # lon = center["Longitude"].to_f
  unless lat == 0.0 && lon == 0.0
    latlng = "#{lat},#{lon}"
    id = latlng.sub(/,/, "")
    puts "Getting image for #{lat}, #{lon} (#{center["Name"]})"
    response = HTTParty.get("https://maps.googleapis.com/maps/api/staticmap?center=#{latlng}&zoom=#{zoom}&size=640x640&maptype=satellite&key=#{api}")
    puts "Saving image as sat-#{id}.png"
    File.open("docs/imgs/ice-#{center["DETLOC"]}-#{id}.png", "wb") do |f|
    # File.open("docs/imgs/sat-#{id}.png", "wb") do |f|
      f.write response.body
    end
    sleep 5
  end
end

