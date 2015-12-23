/**
 * Created on: 22/12/15
 *     Author: Bobby Lin
 */

var latitude = 0;
var longitude = 0;

$(document).ready(function() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log("Lat: " + latitude + " Long: " + longitude )
        });
    }
});
