const KEY = "AIzaSyA4h2YtjbEBrHOlD5JRpMIzsz--TPe9JW8";
const DISTANCE_KEY = "AIzaSyDuaTBkCUIyxHEDGE6PhA4KfrChrBkTHng"
const GEOCODE = "https://maps.googleapis.com/maps/api/geocode/json?address="
let map = null;
let firstClick = true;
let origin = null;
let dest = null;

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
            // address info
        let address = $("#address").val().trim().replace(/ /g, "+");
        let city = $("#city").val().trim().replace(/ /g, "+");
        let state = $("#state").val().trim();
        $("#address").val("")
        $("#city").val("");
        $("#state").val("")
            //make query URL suffix
        let query = address + ",+" + city + ",+" + state + "&key=" + KEY
        $.ajax({
            url: GEOCODE + query
        }).done(function(result) {
            //grad converted long and lat
            let position = {
                    lat: result.results[0].geometry.location.lat,
                    lng: result.results[0].geometry.location.lng
                }
                //add new marker
            let newMarker = new google.maps.Marker({
                    position: position,
                    map: map
                })
                //center on new marker
            map.setCenter(position)
                //add click listener
            google.maps.event.addListener(newMarker, "click", function() {
                console.log(this.position)
                    //build simple info window with address
                let infowindow = new google.maps.InfoWindow({
                    content: '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading"></h1>' +
                        '<div id="bodyContent">' +
                        '<p>' + address.replace(/\+/g, " ") + " " + city.replace(/\+/g, " ") + state + '</p>' +
                        '</div>' +
                        '</div>'
                });
                //on first click add location to origin
                if (firstClick) {
                    origin = new google.maps.LatLng(this.position.lat(), this.position.lng());
                    firstClick = false;
                } else {
                    //on second click add location to dest and call the distance api
                    dest = new google.maps.LatLng(this.position.lat(), this.position.lng());
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix({
                        origins: [origin],
                        destinations: [dest],
                        travelMode: 'DRIVING',
                    }, callback);

                }

                infowindow.open(map, newMarker)
            })
        })
    })
    //logs distance text for testing
function callback(response, status) {
    console.log(response.rows["0"].elements["0"].distance.text)
}
/*https://maps.googleapis.com/maps/api/geocode/
json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY*/
