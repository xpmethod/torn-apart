import Component from "@ember/component";

export default Component.extend({
  lat: 0,
  lng: 0,
  zoom: 5,
  tileLayerUrl:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
});
