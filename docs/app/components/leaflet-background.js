import Component from "@ember/component";

export default Component.extend({
  lat: 0,
  lng: 0,
  zoom: 5,
  zoomControl: false,
  tileLayerUrl:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  attribution:
    "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
});
