/**
 * Created on: 22/12/15
 *     Author: Bobby Lin
 */

$(document).ready(function() {
    function initOpenWeatherAPI() {
        $.getJSON("config.json", function(json) {
            var keys = Object.keys(json);
            var val = json[keys[0]];
            var openWeather = val[0];
            key = openWeather["OpenWeatherAPI"];
        });
    }

    function setAttributes(json) {
        var weatherArr = json.weather[0];
        var html = "";
        html += "<div class='weather-data'>";
        html += "<b>Lat:</b> " + json.coord.lat + "<br>";
        html += "<b>Lon:</b> " + json.coord.lon + "<br>";
        html += "<b>City:</b> " + json.name + "<br>";
        html += "<b>Country:</b> " + json.sys.country + "<br>";
        html += "<b>Weather:</b> " + weatherArr.description + "<br>";
        $(".weather").html(html);
    }
    
    function initWeather(lat,long,key) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID="+key;
        $.getJSON(url,function(json) {
            setAttributes(json);
        });
    }

    var key;
    initOpenWeatherAPI();

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            initWeather(lat,long,key);
        });
    }
    
});
