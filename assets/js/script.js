
// var cityFormEL = document.getElementById('city-form');
// var cityNameEL = document.getElementById('city-name');
// var cityHeaderEL = document.getElementById('city-header');
// var iconHeaderEL = document.getElementById('icon-header');
// var tempHeaderEL = document.getElementById('temp-header');
// var windHeaderEL = document.getElementById('wind-header');
// var humidHeaderEL = document.getElementById('humid-header');
// var uviHeaderEL = document.getElementById('uvi-header');
// var cityListEL = document.getElementById('city-list');
const apikey = ''

const temperEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const humidityEl = document.getElementById('humidity');

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');


const weatherForcastEl = document.getElementById('weather-forcast')

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM'

  timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);

var apiKey = "b029961068cebd7f81e5f282224e139b";
var today = moment().format("ddd L")
var searchBtn = $('#search-button');
var cityListEl = $('#city-list');
var cityInputEl = $('#city-input')
var fiveDayForecastEl = $('#five-day-forecast');
var currentWeatherEl = $('#current-weather');
var cityNameEl = $('.city-name')
var tempEl = $('#temperature');
var humidEl = $('#humidity');
var windSpeedEl = $('#wind-speed');
var uvIndexEl = $('#uv-index');
var forecastEl = $('.forecast')

//Create array of searched cities
var cityHistory = []

//Create function that fetches weather
function fetchWeather(cityName) {

  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    // All URL concatenations will be split into separate lines for easier reading
    + cityName
    + "&units=imperial&appid="
    + apiKey;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      // Display weather content
      currentWeatherEl.removeClass("d-none");
      currentWeatherEl.addClass("d-inline");
      // Set current weather icon variables
      var iconImg = data.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/wn/' + iconImg + '@2x.png';
      // Show the user the searched city, the current date, an icon reflecting the current weather in that city, the current temperature, the current humidity, and the current wind speed
      cityNameEl.text(data.name + " " + "(" + today + ")");
      $('#current-pic').attr('src', iconUrl);
      $('#current-pic').attr('alt', data.weather[0].description);
      tempEl.text("Temperature:" + " " + data.main.temp + "°F");
      windSpeedEl.text("Wind Speed:" + " " + data.wind.speed + " MPH");
      humidEl.text("Humidity:" + " " + data.main.humidity + "%");

      // Obtain UV index

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var uvQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="
        + lat
        + "&lon="
        + lon
        + "&exclude=hourly,daily&appid="
        + apiKey;

      fetch(uvQueryUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("data", data);
          var uvIndex = $('<span>');

          // If UV index is low, color is green; average is yellow; high is red
          if (data.current.uvi < 3) {
            uvIndex.attr('class', 'badge badge-success')
          } else if (data.current.uvi >= 3 && data.current.uvi < 8) {
            uvIndex.attr('class', 'badge badge-warning')
          } else {
            uvIndex.attr('class', 'badge badge-danger')
          }
          uvIndex.text(data.current.uvi);
          uvIndex.css('font-size', '16px');
          uvIndexEl.text("UV Index:" + " ");
          uvIndexEl.append(uvIndex);
        })
      // Obtain five day forecast
      var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="
        + lat
        + "&lon="
        + lon
        + "&units=imperial&exclude=current,minutely,hourly,alerts&appid="
        + apiKey;

      fetch(fiveDayQueryUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("data", data);
          $('#five-day-forecast-header').removeClass("d-none");
          $('#five-day-forecast-header').addClass("d-inline");

          for (var i = 1; i <= 5; i++) {
            // Declare five day forecast variables
            var date = data.daily[i].dt;
            var forecastDate = moment.unix(date).format("MM/DD/YYYY");

            var forecastTemp = data.daily[i].temp.day;
            var iconImg = data.daily[i].weather[0].icon;
            var iconUrl = 'https://openweathermap.org/img/wn/' + iconImg + '@2x.png';
            var forecastWind = data.daily[i].wind_speed;
            var forecastHumidity = data.daily[i].humidity

            // Create and stylize cards
            var card = $('<div>');
            card.attr('class', 'card');
            card.addClass('col-md-2');
            card.addClass('bg-primary');
            card.addClass('text-white'),
              card.addClass('m-2');
            card.addClass('rounded');

            // Create bodies of cards and add information
            var cardBody = $('<div>');
            cardBody.attr('class', 'card-body');
            var cardBodyDate = $('<p>')
            cardBodyDate.text(forecastDate);
            cardBodyDate.css('font-weight', 'bold');
            var cardBodyIcon = $('<img>');
            cardBodyIcon.attr('src', iconUrl);
            cardBodyIcon.attr('alt', data.daily[i].weather[0].description);
            var cardBodyTemp = $('<p>')
            cardBodyTemp.text("Temp: " + forecastTemp + "°F");
            var cardBodyWind = $('<p>');
            cardBodyWind.text("Wind: " + forecastWind + " MPH")
            var cardBodyHumid = $('<p>');
            cardBodyHumid.text("Humidity: " + forecastHumidity + "%");

            cardBody.append(cardBodyDate);
            cardBody.append(cardBodyIcon);
            cardBody.append(cardBodyTemp);
            cardBody.append(cardBodyWind);
            cardBody.append(cardBodyHumid);
            card.append(cardBody);
            fiveDayForecastEl.append(card);
          }
        })
    })
};

// Create a function to clear weather cards of city data when a new city is searched
function clearWeatherCard() {
  fiveDayForecastEl.text("");
}

//Create an event listener to display weather data when search button is clicked
searchBtn.on("click", function (event) {
  // Execute functions
  event.preventDefault();
  clearWeatherCard();

  var searchedCity = cityInputEl.val();
  fetchWeather(searchedCity);
  cityInputEl.val("");
  $('#error-message').text("")
  $('.card-body').addClass("d-inline");
  $('.card-body').removeClass("d-none");
  cityHistory.push(searchedCity);
  var lastViewedCity = $('<li class="list-group-item ml-n5 m-3 text-center bg-light">' + searchedCity + '</li>');
  cityListEl.append(lastViewedCity);
  localStorage.setItem("search", JSON.stringify(cityHistory));
  // Return an error message if the search button is pressed when nothing is typed in the search field
  if (!searchedCity) {
    $('#error-message').text("Please type the name of a city in the search field.");
    $('#error-message').css('font-size', '24px');
    $('#error.message').css('font-weight', 'bold');
    $('.card-body').removeClass("d-inline");
    $('.card-body').addClass("d-none");
    $('#five-day-forecast-header').removeClass("d-inline");
    $('#five-day-forecast-header').addClass("d-none");
    return;
  }
});
// Retrieve the data of a previously searched city when it is clicked
$(document).on("click", ".list-group-item", function () {
  clearWeatherCard();
  var listCity = $(this).text();
  fetchWeather(listCity);
  $('#error-message').text("")
  $('.card-body').addClass("d-inline");
  $('.card-body').removeClass("d-none");
});