function showDate(now) {
  let currentDayIndex = now.getDay();
  let currentDate = now.getDate();
  let currentMonth = now.getMonth();

  let showDate = document.querySelector("#current-date");
  let showMonth = document.querySelector("#current-month");
  let showWeekday = document.querySelector("#current-weekday");
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  showDate.innerHTML = currentDate;
  showMonth.innerHTML = currentMonth;
  showWeekday.innerHTML = weekdays[currentDayIndex];
}

function showTime(now) {
  let hourData = now.getHours();
  let minuteData = now.getMinutes();
  let showHour = document.querySelector("#current-hour");
  let showMinute = document.querySelector("#current-minute");

  showHour.innerHTML = hourData;
  showMinute.innerHTML = minuteData;

  if (hourData < 10) {
    showHour.innerHTML = `0${hourData}`;
  }

  if (minuteData < 10) {
    showMinute.innerHTML = `0${minuteData}`;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input");
  apiWeatherRequest(citySearch.value);
}

function apiWeatherRequest(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector(`#city-name`).innerHTML = response.data.name;
  document.querySelector(`#city-temp`).innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#weather-description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#windspeed`).innerHTML = Math.round(
    response.data.wind.speed
  );

  let weatherIcon = document.querySelector(`#weather-icon`);
  weatherIcon.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute(`alt`, response.data.weather[0].description);

  showTime(new Date());
  showDate(new Date());

  celsiusTemp = response.data.main.temp;
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(apiLocalWeatherRequest);
}

function apiLocalWeatherRequest(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function convertFahrenheit(event) {
  event.preventDefault();
  document.querySelector(`#city-temp`).innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
  fahrenheitLink.classList.add(`active`);
  celsiusLink.classList.remove(`active`);
}

function convertCelsius(event) {
  event.preventDefault();
  document.querySelector(`#city-temp`).innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add(`active`);
  fahrenheitLink.classList.remove(`active`);
}

function weekForecastHtml() {
  let weekForecastDiv = document.querySelector("#weeklyForecast");
  let firstThreeDays = [`Mon`, `Tue`, `Wed`];
  let lastThreeDays = [`Thu`, `Fri`, `Sat`];

  let weekForecastHtml = `<div class="row row-weather-week justify-content-center">`;

  firstThreeDays.forEach(function (day) {
    weekForecastHtml += `         
          <div class="col-3 week-forecast">
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt="weather-icon"
            />
            <div class="forecast-info">
              <span class="forecast-temp" id="forecast-temp">14°</span>
              <span class="forecast-day" id="forcast-day">${day}</span>
            </div>
          </div>
          `;
  });

  weekForecastHtml += `</div> <div class="row row-weather-week justify-content-center">`;

  lastThreeDays.forEach(function (day) {
    weekForecastHtml += `         
          <div class="col-3 week-forecast">
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt="weather-icon"
            />
            <div class="forecast-info">
              <span class="forecast-temp" id="forecast-temp">14°</span>
              <span class="forecast-day" id="forcast-day">${day}</span>
            </div>
          </div>
          `;
  });

  weekForecastHtml += `</div> </div>`;
  weekForecastDiv.innerHTML = weekForecastHtml;
}

let unit = `metric`;
let apiKey = `35aadbc5c927a4d6e9fe4adb5ae41cf4`;

let celsiusTemp = null;

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);

let buttonLocation = document.querySelector("#location-button");
buttonLocation.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector(`#fahrenheitLink`);
fahrenheitLink.addEventListener(`click`, convertFahrenheit);

let celsiusLink = document.querySelector(`#celsiusLink`);
celsiusLink.addEventListener(`click`, convertCelsius);

apiWeatherRequest(`Paris`);
weekForecastHtml();
