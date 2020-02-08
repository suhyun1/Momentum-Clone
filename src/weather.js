const weather = document.querySelector('.js-weather'),
    temperature = weather.querySelector('.temperature'),
    city = weather.querySelector('.city');

const API_KEY = ""; //your key for OpenWeather API
const COORDS = 'coords';

function getWeather(lat, lon){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function(response){
            return response.json();
    })
    .then(function(json){
        const parsedTemperature = json.main.temp;
        const parsedCity = json.name;
        temperature.innerText = `${Math.ceil(parsedTemperature)}℃`;
        city.innerText = parsedCity;
        
    });

}

function handleGeoErr(){
    console.log("Cannot access geolocation");
}

function saveCoords(obj){

    localStorage.setItem(COORDS, JSON.stringify(obj));
}
function handleGeoSuccess(position){
    console.log(position.coords.longitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);

}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr);
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();

    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();