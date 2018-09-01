import L from "leaflet";
import blacksites from "./orr.json";

export default function() {
  return blacksites.features.map(site => {
    const adps = site.properties.adp.map(adp => {
      return { r: adp };
    });
    return {
      dco: site.properties.dco,
      LatLng: new L.LatLng(
        site.geometry.coordinates[1],
        site.geometry.coordinates[0]
      ),
      blacksites: adps
    };
  });
}
