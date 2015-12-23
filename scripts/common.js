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
                displayTempUnit = "C";
            }
            else {
                var temp_fahrenheit = temp_kelvin * 9 / 5 - 459.67;
                displayTemp = temp_fahrenheit.toFixed(1);
                displayTempUnit = "F";
            }
            return {displayTemp: displayTemp, displayTempUnit: displayTempUnit};
        }
        
        var loc = "";
        var city = json.name;
        var country = json.sys.country;
        loc += "<div class='location-data'>";
        loc += "<b>City: </b>" + city + "<br>";
        loc += "<b>Country: </b>" + country + "<br>";
        loc += "</div>";

        var weatherArr = json.weather[0];                
        var weather_conditions = "";
        var icon = weatherArr.icon;
        var description = weatherArr.description;
        var temp_obj = getTemperature();
        weather_conditions += "<b>Temperature: </b>" + temp_obj.displayTemp + " " + temp_obj.displayTempUnit +"<br>";
        weather_conditions += "<b>Icon: </b> <img src='http://openweathermap.org/img/w/" + icon + ".png'><br>";
        weather_conditions += "<b>Weather: </b>" + description + "<br>";
        weather_conditions += "</div>";

        $(".weather").append(loc,weather_conditions);
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
