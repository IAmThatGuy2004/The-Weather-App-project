"use strict";

const api_key = "6d7d8491e5e2c3a0173e9d4c2ff5ddbd";
// should prob Use environment variables for better security, not sure how to, will learn at end of implementation

export const fetchData = function (URL, callback) {
  fetch(`${URL}&appid=${api_key}`)
    .then((res) => res.json()) // Removed unnecessary semicolon
    .then((data) => callback(data)); // Now this will be executed
};

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },

  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },

  airPollution(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },

  reverseGeo(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },

  /*query is a string , it hould expect a value similar to : "Kelowna"; basically city name*/
  Geo(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },
};

//current-whether: https://api.openweathermap.org/data/2.5/weather?lat=23.7644025&lon=90.389015&units=metric&appid=your_api
//current by city: https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${weatherkey}

//5 days forecast: https://api.openweathermap.org/data/2.5/forecast?lat=40.7127281&lon=-74.0060152&units=metric&appid=your_api
//air polution: http://api.openweathermap.org/data/2.5/air_pollution?lat=23.251314&lon=90.851784&appid=your_api
//geocoding: http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=your_api
//geocoding-reverse:http://api.openweathermap.org/geo/1.0/reverse?lat=23.7644025&lon=90.389015&limit=5&appid=your_api
