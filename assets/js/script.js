document.getElementById('searchBtn').addEventListener('click', Event => {

  let cityName = document.getElementById('cityName').value
  console.log(cityName)

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={b029961068cebd7f81e5f282224e139b}`)
    .then(res => {
      console.log(res.data)

      axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`)
    })
})