const KEY = "AIzaSyA4h2YtjbEBrHOlD5JRpMIzsz--TPe9JW8";

function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    google.maps.event.addListener(marker, "click", function() {
        map.setZoom(9);
        map.setCenter(marker.getPosition())
    })
}
