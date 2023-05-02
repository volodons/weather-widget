"use strict";

const header = document.querySelector(".header");
const mainContent = document.querySelector(".main-content");

function checkGeolocationSupport() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      getGeolocationWeatherCurrent,
      errorOutput
    );
  } else {
    const errorElement = document.createElement("h1");
    errorElement.innerText =
      "Sorry, but your browser doesn't support geolocation!";
    mainContent.append(errorElement);
  }
}

function getGeolocationWeatherCurrent(pos) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&lang=en&appid=2c635de091adc7b86bb67624d5ba7e05`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.name);
      console.log(data.sys.country);
      header.innerHTML = `<div class="header header__column">
            <span class="header__text--big-bold">${Math.round(
              data.main.temp
            )}°C</span>
            <span>Feels like ${Math.round(data.main.feels_like)}°C</span>
          </div>
          <div class="header header__column">
            <span class="header__text--bold">${data.weather[0].main}</span>
            <span>${data.name}, ${data.sys.country}</span>
          </div>
          <div class="header header__column">
            <img
              src="https://openweathermap.org/img/wn/${
                data.weather[0].icon
              }@2x.png"
              alt="${data.weather[0].description}"
              title="${data.weather[0].description}"
            />
          </div>`;
    });
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&lang=en&appid=2c635de091adc7b86bb67624d5ba7e05`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const day1Info = data.list.slice(0, 8);
      const day2Info = data.list.slice(8, 16);
      const day3Info = data.list.slice(16, 24);
      const day4Info = data.list.slice(24, 32);
      const day5Info = data.list.slice(32, 40);
      console.log(day1Info);
      console.log(day2Info);
      console.log(day3Info);
      console.log(day4Info);
      console.log(day5Info);

      const day1MinTemp = day1Info.reduce((prev, current) =>
        prev.main.temp_min < current.main.temp_min ? prev : current
      );
      const day1MaxTemp = day1Info.reduce((prev, current) =>
        prev.main.temp_max > current.main.temp_max ? prev : current
      );
      const day2MinTemp = day2Info.reduce((prev, current) =>
        prev.main.temp_min < current.main.temp_min ? prev : current
      );
      const day2MaxTemp = day2Info.reduce((prev, current) =>
        prev.main.temp_max > current.main.temp_min ? prev : current
      );
      const day3MinTemp = day3Info.reduce((prev, current) =>
        prev.main.temp_min < current.main.temp_min ? prev : current
      );
      const day3MaxTemp = day3Info.reduce((prev, current) =>
        prev.main.temp_max > current.main.temp_max ? prev : current
      );
      const day4MinTemp = day4Info.reduce((prev, current) =>
        prev.main.temp_min < current.main.temp_min ? prev : current
      );
      const day4MaxTemp = day4Info.reduce((prev, current) =>
        prev.main.temp_max > current.main.temp_max ? prev : current
      );
      const day5MinTemp = day5Info.reduce((prev, current) =>
        prev.main.temp_min < current.main.temp_min ? prev : current
      );
      const day5MaxTemp = day5Info.reduce((prev, current) =>
        prev.main.temp_max > current.main.temp_max ? prev : current
      );

      mainContent.innerHTML = `<div class="content content__row">
            <span>THU</span>
            <img
              src="https://openweathermap.org/img/wn/${
                day1MaxTemp.weather[0].icon
              }@2x.png"
              alt="${day1MaxTemp.weather[0].description}"
              title="${day1MaxTemp.weather[0].description}"
            />
            <span>${day1MaxTemp.weather[0].main}</span>
            <div class="content__column">
              <span>${Math.round(day1MaxTemp.main.temp_max)}°C</span>
              <span>${Math.round(day1MinTemp.main.temp_min)}°C</span>
            </div>
          </div>
          <div class="content content__row">
            <span>FRI</span>
            <img
              src="https://openweathermap.org/img/wn/${
                day2MaxTemp.weather[0].icon
              }@2x.png"
              alt="${day2MaxTemp.weather[0].description}"
              title="${day2MaxTemp.weather[0].description}"
            />
            <span>${day2MaxTemp.weather[0].main}</span>
            <div class="content__column">
              <span>${Math.round(day2MaxTemp.main.temp_max)}°C</span>
              <span>${Math.round(day2MinTemp.main.temp_min)}°C</span>
            </div>
          </div>
          <div class="content content__row">
            <span>SAT</span>
            <img
              src="https://openweathermap.org/img/wn/${
                day3MaxTemp.weather[0].icon
              }@2x.png"
              alt="${day3MaxTemp.weather[0].description}"
              title="${day3MaxTemp.weather[0].description}"
            />
            <span>${day3MaxTemp.weather[0].main}</span>
            <div class="content__column">
              <span>${Math.round(day3MaxTemp.main.temp_max)}°C</span>
              <span>${Math.round(day3MinTemp.main.temp_min)}°C</span>
            </div>
          </div>
          <div class="content content__row">
            <span>SUN</span>
            <img
              src="https://openweathermap.org/img/wn/${
                day4MaxTemp.weather[0].icon
              }@2x.png"
              alt="${day4MaxTemp.weather[0].description}"
              title="${day4MaxTemp.weather[0].description}"
            />
            <span>${day4MaxTemp.weather[0].main}</span>
            <div class="content__column">
              <span>${Math.round(day4MaxTemp.main.temp_max)}°C</span>
              <span>${Math.round(day4MinTemp.main.temp_min)}°C</span>
            </div>
          </div>
          <div class="content content__row">
            <span>MON</span>
            <img
              src="https://openweathermap.org/img/wn/${
                day5MaxTemp.weather[0].icon
              }@2x.png"
              alt="${day5MaxTemp.weather[0].description}"
              title="${day5MaxTemp.weather[0].description}"
            />
            <span>${day5MaxTemp.weather[0].main}</span>
            <div class="content__column">
              <span>${Math.round(day5MaxTemp.main.temp_max)}°C</span>
              <span>${Math.round(day5MinTemp.main.temp_min)}°C</span>
            </div>
          </div>`;
    });
}

function errorOutput() {
  console.log("Error!");
}

checkGeolocationSupport();
