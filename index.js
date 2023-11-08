function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let hour = currentDate.getHours();
  hour < 10 ? (hour = `0${hour}`) : false;
  let minutes = currentDate.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : false;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"> `;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
        alt=""
        width="40"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">18&deg;</span>
        <span class="weather-forecast-temperature-min">12&deg;</span>
      </div>
    </div>
  `;
  });
  forecastHTML = forecastHTML + `<div>;`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
}

let weatherIcon = document.createElement("img");
weatherIcon.classList.add("weather-icon");

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c05f3c3d653fc2957ecba334d1f4feb1";
  let apiURl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURl);
  axios.get(apiURl).then(displayForecast);
}

function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  let city = (document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}`);
  let temperature = (document.querySelector(
    "#temperature"
  ).innerHTML = `${Math.round(response.data.main.temp)}`);
  let weatherDescription = (document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`);
  let humidity = (document.querySelector(
    ".humidity"
  ).innerHTML = `${response.data.main.humidity}%`);
  let wind = (document.querySelector(".wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`);
  let date = (document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ));

  let weatherImg = document.querySelector(".weather-img").append(weatherIcon);

  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c05f3c3d653fc2957ecba334d1f4feb1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  search(city);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperature = (document.querySelector("#temperature").innerHTML =
    fahrenheitTemp);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  console.log(celsiusTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  console.log(celsiusTemp);
  let temperature = (document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemp));
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  console.log(celsiusTemp);
}
function getLocation(position) {
  let apiKey = "c05f3c3d653fc2957ecba334d1f4feb1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocal = document
  .querySelector("#current-btn")
  .addEventListener("click", getPosition);

let form = document
  .querySelector(".search-form")
  .addEventListener("submit", handleSubmit);

let celsiusTemp = null;
console.log(celsiusTemp);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);

search("Johannesburg");
displayForecast();
