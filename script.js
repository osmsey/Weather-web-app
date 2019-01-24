let appKey = 'a693d22b6e4b4fecc9c43c0393408b60';
let units = 'metric';
let searchMethod;

function searchMethodType(searchTerm){
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod = 'zip';
    }
    else {
        searchMethod = 'q';
    }
};

function weatherInfoPosition() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.5}px)`;
    weatherContainer.style.visibility = 'visible';
};

function init(infoFromServer){
    switch (infoFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpeg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpeg")';
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rainy.jpeg")';
            break;
        
        default:
            
            break;
    };


    let weatherDescriptionElement = document.getElementById('weatherDescription');
    let humidityElement = document.getElementById('humidity');
    let windElement = document.getElementById('wind');
    let temperatureElement = document.getElementById('temperature');
    let cityNameElement = document.getElementById('cityName');
    let weatherIconElement = document.getElementById('iconImg');

    weatherIconElement.src = 'http://openweathermap.org/img/w/' + infoFromServer.weather[0].icon + '.png';
    let weatherDescriptionRaw = infoFromServer.weather[0].description;
    weatherDescriptionElement.innerText = weatherDescriptionRaw.charAt(0).toUpperCase() + weatherDescriptionRaw.slice(1);
    cityNameElement.innerHTML = infoFromServer.name;
    temperatureElement.innerHTML = Math.floor(infoFromServer.main.temp) + '&#176';
    humidityElement.innerHTML = 'Humidity at ' + Math.floor(infoFromServer.main.humidity) + '%';
    windElement.innerHTML = 'Wind Speed at ' + Math.floor(infoFromServer.wind.speed) + ' m/s';
    weatherInfoPosition();
};

function weatherSearch(searchTerm){
    searchMethodType(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appKey}&units=${units}`).then(result =>{return result.json()})
    .then(result =>{init(result)});
}


document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm){
        weatherSearch(searchTerm);
    }
});

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    let key = e.keycode || e.which;
    if (key === 13){
        let searchTerm = document.getElementById('searchInput').value;
        weatherSearch(searchTerm);
    }
});
