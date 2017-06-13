const KEY = "AIzaSyA4h2YtjbEBrHOlD5JRpMIzsz--TPe9JW8";
const GEOCODE = "https://maps.googleapis.com/maps/api/geocode/json?address="
let map = null;

function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
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
$("#submit").on("click", function(e) {
        e.preventDefault()
        let address = $("#address").val().trim().replace(/ /g, "+");
        let city = $("#city").val().trim().replace(/ /g, "+");
        let state = $("#state").val().trim();
        let query = address + ",+" + city + ",+" + state + "&key=" + KEY
        console.log(query)
        $.ajax({
            url: GEOCODE + query
        }).done(function(result) {
            console.log(result)
            let newMarker = new google.maps.Marker({
                position: {
                    lat: result.results[0].geometry.location.lat,
                    lng: result.results[0].geometry.location.lng
                },
                map: map
            })
        })
    })
    /*https://maps.googleapis.com/maps/api/geocode/
    json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY*/
