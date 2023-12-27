function displayWeatherData(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#current-temperature");
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#current-date");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let icon = document.querySelector("#current-temperature-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  searchInputElement.value = "";
}

function searchCity(city) {
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82ab0a2aa3df9613f110332cc0bfe286&units=metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=20e225e04f4b81d200c3ab2o4t7f2325&units=metric`;
  axios.get(apiUrl).then(displayWeatherData);
}
searchCity("Kyiv");

function handleSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  searchCity(city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
