let platform = new H.service.Platform({
    'apikey': '1wdllbc8gDrFrqxM6hm8VB1BO852S5Nd8loWZLLNTTc'
  });




function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;
    let geocoder = platform.getSearchService(),
        landmarkGeocodingParameters = {
          q: title,
          at: '0,0',
          limit: 1
        };
  
    geocoder.discover(
      landmarkGeocodingParameters,
      showMap,
      (e) => console.log(e)
    );
  }

function showMap(result) {
    let location = result.items[0].position;

    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
        zoom: 17,
        center: { lat: location.lat, lng: location.lng }
    });
    let marker = new H.map.Marker({lat: location.lat, lng: location.lng});
    map.addObject(marker);
    let ui = H.ui.UI.createDefault(map, defaultLayers);
}
landmarkGeocode();


