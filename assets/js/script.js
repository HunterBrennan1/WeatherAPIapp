
var cityFormEL = document.getElementById('city-form');
var cityNameEL = document.getElementById('city-name');
var cityHeaderEL = document.getElementById('city-header');
var iconHeaderEL = document.getElementById('icon-header');
var tempHeaderEL = document.getElementById('temp-header');
var windHeaderEL = document.getElementById('wind-header');
var humidHeaderEL = document.getElementById('humid-header');
var uviHeaderEL = document.getElementById('uvi-header');
var cityListEL = document.getElementById('city-list');

var searchedCities = [];

function getCityBtn(city) {
  var cityBtn = document.createElement('button');
  var btnName = document.createTextNode(city);
  cityBtn.setAttribute('class', 'cityName');
  cityBtn.setAttribute('data-city', city);
  cityBtn.appendChild(btnName);
  cityListEL.appendChild(cityBtn);
}

function getHeader(cityName) {
  var geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b029961068cebd7f81e5f282224e139b`

  fetch(geoUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data);
      getWeather(data[0].lat, data[0].lon, cityName)
    })
}

function (getWeather (lat, lon, cityName){
  var oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&&appid=b029961068cebd7f81e5f282224e139b`

  fetch(oneCallUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
})

.then(function (data) {
  console.log(data);
  var current = {
    currentCity: cityName,
    currentDate: data.current.dt,
    currentIcon: data.current.weather[0].icon,
    curretTemp: data.current.temp,
    currentWind: data.current.wind_speed,
    currentHumidity: data.current.humidity,
    currentUvi: data.current.uvi,

    dOneDate: data.daily[1].dt,
    dOneIcon: data.daily[1].weather[0].icon,
    dOneTemp: data.daily[1].temp.day,
    dOneWind: data.daily[1].wind_speed,
    dOneHum: data.daily[1].humidity,

    dTwoDate: data.daily[2].dt,
    dTwoIcon: data.daily[2].weather[0].icon,
    dTwoTemp: data.daily[2].temp.day,
    dTwoWind: data.daily[2].wind_speed,
    dTwoHum: data.daily[2].humidity,

    dThreeDate: data.daily[3].dt,
    dThreeIcon: data.daily[3].weather[0].icon,
    dThreeTemp: data.daily[3].temp.day,
    dThreeWind: data.daily[3].wind_speed,
    dThreeHum: data.daily[3].humidity,

    dFourDate: data.daily[4].dt,
    dFourIcon: data.daily[4].weather[0].icon,
    dFourTemp: data.daily[4].temp.day,
    dFourWind: data.daily[4].wind_speed,
    dFourHum: data.daily[4].humidity,

    dFiveDate: data.daily[5].dt,
    dFiveIcon: data.daily[5].weather[0].icon,
    dFiveTemp: data.daily[5].temp.day,
    dFiveWind: data.daily[5].wind_speed,
    dFiveHum: data.daily[5].humidity,
  };
})
