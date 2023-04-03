
const myGeoAPIKey = '8467611827b24b9cb87cd81aaf5480e2';
const WEATHER_API_KEY = '03a95578d63bc695419f75ad78e74a94';

var lat = document.getElementById('lat');
var lon = document.getElementById('lon');
var w_lat, w_lon;


function geocodeAddress(){
    var address = document.getElementById("address").value;

    if(!address || address.length < 3){
        prompt("Enter Valid Location");
        return;
    }

    const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${myGeoAPIKey}`;

    fetch(geocodingUrl).then(result => result.json()).then(featureCollection => {
        console.log(featureCollection);
        const foundLocation = featureCollection.features[0];

        lat.value = foundLocation.properties.lat || "";
        lon.value = foundLocation.properties.lon || "";

        document.getElementById("location").value = foundLocation.properties.formatted || "";
        

        w_lat = foundLocation.properties.lat || "";
        w_lon = foundLocation.properties.lon || "";

        checkWeather();

    });

    

}

function checkWeather(){

    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${w_lat}&lon=${w_lon}&appid=${WEATHER_API_KEY}`;

    fetch(weatherURL).then(result => result.json()).then(data => {
        console.log(data);

        document.getElementById("wind").value = data.wind.deg || "NaN";
        document.getElementById("windgust").value = data.wind.gust || "NaN";
        document.getElementById("windspeed").value = data.wind.speed || "NaN";
        document.getElementById("temp").value = data.main.temp || "NaN";
        document.getElementById("pressure").value = data.main.pressure || "NaN";
        document.getElementById("humidity").value = data.main.humidity || "NaN";
        document.getElementById("max_temp").value = data.main.temp_max || "NaN";
        document.getElementById("max_temp_celsius").value = (data.main.temp_max || "") - 273.15;
        document.getElementById("timezone").value = data.timezone || "NaN";
        document.getElementById("visibility").value = data.visibility || "NaN";
        document.getElementById("clouds").value = data.clouds.all || "NaN";
    });

}