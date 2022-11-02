// document.getElementById('searchBtn').addEventListener('click', event => {

//   let cityName = document.getElementById('cityName').value
//   console.log(cityName)

// axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b029961068cebd7f81e5f282224e139b`)
//     .then(res => {
//       console.log(res.data)
//       let lat = res.data.city.name.lat
//       let lon = res.data.city.name.lon
//       axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&&appid=b029961068cebd7f81e5f282224e139b`)
//         .then(resp => {
//           console.log(resp.data)
//         })
//     })
// })

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

})
