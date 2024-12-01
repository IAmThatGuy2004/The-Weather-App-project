"use strict";

const api_key = "6d7d8491e5e2c3a0173e9d4c2ff5ddbd";
// should prob Use environment variables for better security, not sure how to, will learn at end of implementation

export const fetchData = function (URL, callback) {
  fetch(`${URL}&appid=${api_key}`)
    .then((res) => res.json()) // Removed unnecessary semicolon
    .then((data) => callback(data)); // Now this will be executed
};

export const fetchopenData = function (forecastType, lat, lon, callback) {
  // Check if the forecastType is valid and generate the appropriate URL
  if (openurl[forecastType]) {
    const url = openurl[forecastType](lat, lon); // Access the method dynamically
    fetch(url)
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => callback(data)) // Pass the data to the callback function
      .catch((error) => {
        console.error("Error fetching the data:", error);
      });
  } else {
    console.error(`Invalid forecast type: ${forecastType}`);
  }
};

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  },

  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;
  },

  airPollution(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`;
  },

  reverseGeo(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`;
  },

  /*query is a string , it hould expect a value similar to : "Kelowna"; basically city name*/
  Geo(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },
};

export const openurl = {
  hourly(lat, lon) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_180m,weather_code,wind_speed_180m,wind_direction_180m&timezone=auto&daily=sunrise,sunset`;
  },

  daily(lat, lon) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`;
  },
};

//current-whether: https://api.openweathermap.org/data/2.5/weather?lat=23.7644025&lon=90.389015&units=metric&appid=your_api
//current by city: https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${weatherkey}

//5 days forecast: https://api.openweathermap.org/data/2.5/forecast?lat=40.7127281&lon=-74.0060152&units=metric&appid=your_api
//air polution: http://api.openweathermap.org/data/2.5/air_pollution?lat=23.251314&lon=90.851784&appid=your_api
//geocoding: http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=your_api
//geocoding-reverse:http://api.openweathermap.org/geo/1.0/reverse?lat=23.7644025&lon=90.389015&limit=5&appid=your_api
//

//current-whether:https://api.openweathermap.org/data/2.5/weather?lat=49.8879177&lon=-119.495902&units=metric&appid=6d7d8491e5e2c3a0173e9d4c2ff5ddbd

//5 days forecast: https://api.openweathermap.org/data/2.5/forecast?lat=49.8879177&lon=-119.495902&units=metric&appid=6d7d8491e5e2c3a0173e9d4c2ff5ddbd

//air polution: http://api.openweathermap.org/data/2.5/air_pollution?lat=49.8879177&lon=-119.495902&appid=6d7d8491e5e2c3a0173e9d4c2ff5ddbd
//geocoding: http://api.openweathermap.org/geo/1.0/direct?q=kelowna&limit=5&appid=6d7d8491e5e2c3a0173e9d4c2ff5ddbd
//geocoding-reverse:http://api.openweathermap.org/geo/1.0/reverse?lat=49.8879177&lon=-119.495902&limit=5&appid=6d7d8491e5e2c3a0173e9d4c2ff5ddbd

//  https://api.openweathermap.org/data/2.5/forecast/hourly? lat=49.8879177&lon=-119.495902&appid=6d7d8491e5e2c3a0173e9d4c2ff5ddbd

/*
WMO Weather interpretation codes (WW)
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
*/
