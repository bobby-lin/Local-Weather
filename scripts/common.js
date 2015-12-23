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
        function getTemperature() {
            var temp_kelvin = json.main.temp;
            var displayTemp = 0;
            var displayTempUnit = "";
            var imperial_metric = ['US', 'BS', 'BZ', 'KY', 'PW'];
            if (imperial_metric.indexOf(country) === -1) {
                var temp_celsius = temp_kelvin - 273.15;
                displayTemp = temp_celsius.toFixed(1);
                displayTempUnit = "&#x2103";
            }
            else {
                var temp_fahrenheit = temp_kelvin * 9 / 5 - 459.67;
                displayTemp = temp_fahrenheit.toFixed(1);
                displayTempUnit = "&#x2109";
            }
            return {displayTemp: displayTemp, displayTempUnit: displayTempUnit};
        }
        
        var loc = "";
        var city = json.name;
        var country = json.sys.country;
        loc += city + ", " + country;
        $(".location").html(loc);
        
        var weatherArr = json.weather[0];
        var icon = weatherArr.icon;
        var description = weatherArr.description;
        var temp_obj = getTemperature();
        var temp = temp_obj.displayTemp + " " + temp_obj.displayTempUnit;
        var weather_icon = "<img src='http://openweathermap.org/img/w/" + icon + ".png'>";
        description = description.charAt(0).toUpperCase() + description.slice(1);
        var weather_data = "<h5>" + description + "</h5>";

        $(".weather-data").html(weather_data);
        $(".weather-icon").html(weather_icon);
        $(".temperature").html(temp);
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
