/**
 * Created on: 22/12/15
 *     Author: Bobby Lin
 */

var latitude = 0;
var longitude = 0;
var openWeather = "";

function setOpenWeatherAPI() {
    $.getJSON("config.json", function(data) {
        var keys = Object.keys(data);
        var arr = data[keys[0]];
        arr.forEach(function(val){
            var key = Object.keys(val);
            if(key[0] === "OpenWeatherAPI") {
                openWeather = val[key[0]];
            }
        });
    });
}

function getWeatherJSON() {
    var url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude + "&lon=" + longitude;
    url += "&APPID=" + openWeather;
    $.getJSON(url,function(json) {
        console.log(json);
    })
}

function setCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log("Lat: " + latitude + " Long: " + longitude);

        });
    }
}

$(document).ready(function() {
    setOpenWeatherAPI();
    setCoordinates();
    getWeatherJSON();
});
