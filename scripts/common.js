/**
 * Created on: 22/12/15
 *     Author: Bobby Lin
 */

function toggleTemperature() {
    var e = document.getElementById("currentTemp");
    var tempArr = e.innerHTML.split(" ");
    var temp = tempArr[0];
    var unit = tempArr[1];
    if(unit.trim() === "℃") {
        unit = "℉";
        temp = (temp * 1.8 + 32).toFixed(1);
    } 
    else {
        unit = "℃";
        temp = ((temp - 32) / 1.8).toFixed(1);
    }
    e.innerHTML = temp + " " + unit;
}

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
                displayTempUnit = "℃";
            }
            else {
                var temp_fahrenheit = temp_kelvin * 9 / 5 - 459.67;
                displayTemp = temp_fahrenheit.toFixed(1);
                displayTempUnit = "℉";
            }
            return {displayTemp: displayTemp, displayTempUnit: displayTempUnit};
        }
        
        function getBackgroundURL(type) {
            if(type === "thunderstorm") {
                return "http://tinyurl.com/ocz7m99";
            }
            else if(type === "drizzle") {
                return "http://tinyurl.com/nssuuxq";
            }
            else if(type === "rain") {
                return "http://tinyurl.com/nn9qzao";
            }
            else if(type === "snow") {
                return "http://tinyurl.com/na3ba2a";
            }
            else if(type === "clear") {
                return "http://tinyurl.com/hrsdo9f";
            }
            else if(type === "clouds") {
                return "http://tinyurl.com/zl6mhd4";
            }
            else {
                return "http://tinyurl.com/zehm5ru";
            }
        }
        
        var loc = "";
        var city = json.name;
        var country = json.sys.country;
        loc += city + ", " + country;
        $(".location").html(loc);
        
        var weatherArr = json.weather[0];
        var icon = weatherArr.icon;
        var description = weatherArr.description;
        var bg_url = getBackgroundURL(weatherArr.main.toLowerCase());
        var temp_obj = getTemperature();
        var temp = "<p id='currentTemp'>" + temp_obj.displayTemp + " " + temp_obj.displayTempUnit  + "</p>";
        var weather_icon = "<img id='weather-icon' src='http://openweathermap.org/img/w/" + icon + ".png'>";
        description = description.charAt(0).toUpperCase() + description.slice(1);
        var weather_data = description;

        $(".weather-data").html(weather_data);
        $(".weather-icon").html(weather_icon);
        $(".temperature").html(temp);
        var html = document.getElementsByTagName('html')[0];
        html.style.backgroundImage = "url('" + bg_url + "')";
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
