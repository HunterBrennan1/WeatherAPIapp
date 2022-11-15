
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

function getWeather(lat, lon, cityName) {
  var oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&&appid=b029961068cebd7f81e5f282224e139b`

  fetch(oneCallUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
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
      localStorage.setItem('current', JSON.stringify(current));
      renderCurrentItem();
    })
}

function renderCurrentItem() {
  var lastItem = JSON.parse(localStorage.getItem('current'));
  var date = moment.unix(lastItem.currentDate).format("MM/DD/YYYY");
  var dateOne = moment.unix(lastItem.dOneDate).format("MM/DD/YYYY");
  var dateTwo = moment.unix(lastItem.dTwoDate).format("MM/DD/YYYY");
  var dateThree = moment.unix(lastItem.dThreeDate).format("MM/DD/YYYY");
  var dateFour = moment.unix(lastItem.dFourDate).format("MM/DD/YYYY");
  var dateFive = moment.unix(lastItem.dFiveDate).format("MM/DD/YYYY");
  var weatherIcon = document.createElement('img');
  var weatherIcon1 = document.createElement('img');
  var weatherIcon2 = document.createElement('img');
  var weatherIcon3 = document.createElement('img');
  var weatherIcon4 = document.createElement('img');
  var weatherIcon5 = document.createElement('img');
  var iconUrl = `https://openweathermap.org/img/wn/${lastItem.currentIcon}@2x.png`;
  var iconOne = `https://openweathermap.org/img/wn/${lastItem.dOneIcon}@2x.png`;
  var iconTwo = `https://openweathermap.org/img/wn/${lastItem.dTwoIcon}@2x.png`;
  var iconThree = `https://openweathermap.org/img/wn/${lastItem.dThreeIcon}@2x.png`;
  var iconFour = `https://openweathermap.org/img/wn/${lastItem.dFourIcon}@2x.png`;
  var iconFive = `https://openweathermap.org/img/wn/${lastItem.dFiveIcon}@2x.png`;
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon1.setAttribute('src', iconOne);
  weatherIcon2.setAttribute('src', iconTwo);
  weatherIcon3.setAttribute('src', iconThree);
  weatherIcon4.setAttribute('src', iconFour);
  weatherIcon5.setAttribute('src', iconFive);

  if (lastItem !== null) {
    /* Display current Date*/
    cityHeaderEl.textContent = lastItem.currentCity + ' (' + date + ') ';
    cityHeaderEl.appendChild(weatherIcon);
    tempHeaderEl.textContent = 'Temp: ' + lastItem.curretTemp + '°F';
    windHeaderEl.textContent = 'Wind: ' + lastItem.currentWind + ' MPH';
    humHeaderEl.textContent = 'Humidity: ' + lastItem.currentHumidity + ' %';
    uviHeaderEl.innerHTML = 'UV Index: <span id="span"> ' + lastItem.currentUvi + ' </span>';
    if (lastItem.currentUvi < 3) {
      document.querySelector('span').style.backgroundColor = 'green';
    } else if (lastItem.currentUvi < 6) {
      document.querySelector('span').style.backgroundColor = 'orange';
    } else {
      document.querySelector('span').style.backgroundColor = 'red';
    }

    /* Day 1 Card info */
    document.getElementById('date1').textContent = dateOne;
    document.getElementById('icon1').textContent = "";
    document.getElementById('icon1').appendChild(weatherIcon1);
    document.getElementById('temp1').textContent = 'Temp: ' + lastItem.dOneTemp + '°F';
    document.getElementById('wind1').textContent = 'Wind: ' + lastItem.dOneWind + ' MPH';
    document.getElementById('humidity1').textContent = 'Humidity: ' + lastItem.dOneHum + ' %';

    /* Day 2 Card info */
    document.getElementById('date2').textContent = dateTwo;
    document.getElementById('icon2').textContent = "";
    document.getElementById('icon2').appendChild(weatherIcon2);
    document.getElementById('temp2').textContent = 'Temp: ' + lastItem.dTwoTemp + '°F';
    document.getElementById('wind2').textContent = 'Wind: ' + lastItem.dTwoWind + ' MPH';
    document.getElementById('humidity2').textContent = 'Humidity: ' + lastItem.dTwoHum + ' %';

    /* Day 3 Card info */
    document.getElementById('date3').textContent = dateThree;
    document.getElementById('icon3').textContent = "";
    document.getElementById('icon3').appendChild(weatherIcon3);
    document.getElementById('temp3').textContent = 'Temp: ' + lastItem.dThreeTemp + '°F';
    document.getElementById('wind3').textContent = 'Wind: ' + lastItem.dThreeWind + ' MPH';
    document.getElementById('humidity3').textContent = 'Humidity: ' + lastItem.dThreeHum + ' %';

    /*Day 4 Card info */
    document.getElementById('date4').textContent = dateFour;
    document.getElementById('icon4').textContent = "";
    document.getElementById('icon4').appendChild(weatherIcon4);
    document.getElementById('temp4').textContent = 'Temp: ' + lastItem.dFourTemp + '°F';
    document.getElementById('wind4').textContent = 'Wind: ' + lastItem.dFourWind + ' MPH';
    document.getElementById('humidity4').textContent = 'Humidity: ' + lastItem.dFourHum + ' %';

    /* Day 5 Card info */
    document.getElementById('date5').textContent = dateFive;
    document.getElementById('icon5').textContent = "";
    document.getElementById('icon5').appendChild(weatherIcon5);
    document.getElementById('temp5').textContent = 'Temp: ' + lastItem.dFiveTemp + '°F';
    document.getElementById('wind5').textContent = 'Wind: ' + lastItem.dFiveWind + ' MPH';
    document.getElementById('humidity5').textContent = 'Humidity: ' + lastItem.dFiveHum + ' %';
  } else {
    return;
  }
}

function formSubmitHandler(event) {
  event.preventDefault();
  var inputCity = cityNameEl.value.trim();
  getHeader(inputCity);
  cityFormEl.value = '';

  if (!searchedCities.includes(inputCity)) {
    searchedCities.push(inputCity)

    getCityBtn(cityNameEl.value);
  }

}

function buttonClickHandler(event) {
  event.preventDefault();
  var reSearchCity = event.target.getAttribute('data-city');
  console.log(reSearchCity)
  getHeader(reSearchCity);

}

cityFormEl.addEventListener('submit', formSubmitHandler);
cityListEl.addEventListener('click', buttonClickHandler);

renderCurrentItem();