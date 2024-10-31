mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: Stays.geometry.coordinates,
    zoom: 10
});
// console.log(Stays.geometry.coordinates);
const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(Stays.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${Stays.title}</h6><p>Exect Location Provided after booking</p>`))
    .addTo(map);