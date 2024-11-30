import { fetchData, url, fetchopenData, openurl } from "./weather-api.js";
import * as module from "./weather-module.js";

("use strict");

const searchToggler = document.querySelectorAll("[data-search-toggler]");
const searchView = document.querySelector("[data-search-view]");
const searchResult = document.querySelector("[data-search-result]");
const searchLocation = document.querySelectorAll("[data-search-location]");

const currentweather = document.querySelector("[data-current-weather]");
const fivedays = document.querySelectorAll("[data-5-day-forecast]");

// Toggle search view and result on toggler click
searchToggler.forEach((toggler) => {
  toggler.addEventListener("click", () => {
    searchView.classList.toggle("active");
    searchResult.classList.toggle("active");
  });
});

// Close search-view and search-result when a location is selected
searchLocation.forEach((location) => {
  location.addEventListener("click", () => {
    searchView.classList.remove("active");
    searchResult.classList.remove("active");
  });
});

/**
 * SEARCH INTEGRATION
 */
const searchField = document.querySelector("[data-search-field]");
let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener("input", function () {
  // Clear the existing timeout if it exists
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Handle empty search field
  if (!searchField.value.trim()) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
    return;
  }

  // Add searching class to indicate loading
  searchField.classList.add("searching");

  // Set a new timeout to fetch data after delay
  searchTimeout = setTimeout(() => {
    fetchData(url.Geo(searchField.value.trim()), function (locations) {
      // Stop the loading spinner
      searchField.classList.remove("searching");

      // Display search results
      searchResult.classList.add("active");
      searchResult.innerHTML = `
        <ul class="view-list" data-search-list></ul>
      `;

      const items = [];

      // Populate the search result list
      for (const { name, lat, lon, country, state } of locations) {
        const searchItem = document.createElement("li");
        searchItem.classList.add("view-item");

        searchItem.innerHTML = `
          <span class="m-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg> </span>
          <div>
            <p class="item-title">${name}</p>
            <p class="label-2 item-subtitle">${state || ""}, ${country}</p>
          </div>
          <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler></a>
        `;

        searchResult
          .querySelector("[data-search-list]")
          .appendChild(searchItem);
        items.push(searchItem.querySelector("[data-search-toggler]"));
      }

      // Add event listeners to search items
      items.forEach((item) => {
        item.addEventListener("click", () => {
          searchView.classList.remove("active");
          searchResult.classList.remove("active");
        });
      });
    });
  }, searchTimeoutDuration);
});

// Additional UI elements
const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector(
  "[data-current-location-btn]"
);
const errorContent = document.querySelector("[data-error-content]");

// Function to extract lat and lon from the hash fragment and log them
function logCoordinatesFromHash() {
  const currentURL = window.location.href; // Get the current URL
  const hashFragment = window.location.hash; // Extract the hash fragment (e.g., #/weather?lat=...&lon=...)
  let coordinates = { lat: null, lon: null };

  // Check if the hash contains query parameters
  if (hashFragment.includes("?")) {
    const queryParams = hashFragment.split("?")[1]; // Get the query part after '?'
    const params = new URLSearchParams(queryParams); // Parse the query parameters

    const latitude = params.get("lat");
    const longitude = params.get("lon");

    coordinates.lat = latitude;
    coordinates.lon = longitude;

    if (latitude && longitude) {
      console.log(
        `Hello world, your latitude is: ${latitude} and longitude is: ${longitude}`
      );
    } else {
      console.log("Latitude and longitude not found in the hash fragment.");
    }
  } else {
    console.log("No query parameters found in the hash fragment.");
  }

  return coordinates;
}

// Listen for changes in the hash fragment
window.addEventListener("hashchange", logCoordinatesFromHash);

// Run the function once on page load to handle the initial hash
const coords = logCoordinatesFromHash();

console.log(`hello world  ${coords.lat} ,  ${coords.lon}`);

/*REtrieving of data */

// Function to log weather details
function logWeatherDetails(data) {
  const {
    weather: [{ id, main, description, icon }],
    main: { temp, feels_like, pressure, humidity },
    visibility,
    sys: { sunrise, sunset },
    timezone,
    dt,
  } = data;

  console.log("Weather Details:");
  console.log(`- ID: ${id}`);
  console.log(`- Main: ${main}`);
  console.log(`- Description: ${description}`);
  console.log(`- Icon: ${icon}`);
  console.log("Main Metrics:");
  console.log(`- Temperature: ${temp}°C`);

  console.log(`- Date: ${module.getDate(dt, timezone)}`);

  const weatherdetails = {
    id,
    main,
    description,
    icon,
    temp,
    date: module.getDate(dt, timezone),
  };

  return weatherdetails;
}

//function to log location details
function logLocationDetails(data) {
  console.log("Raw API response:", data);

  const { name, country, state } = data[0];

  console.log("cityDetails:");
  console.log(`- City: ${name}`);
  console.log(`- Country: ${country}`);
  console.log(`- State: ${state}`);

  const locationdetails = {
    name,
    country,
    state,
  };

  return locationdetails;
}

//function to log highlights details
function logaqiDetails(data) {
  const {
    main: { aqi },
    components: { no2, so2, pm2_5, o3 },
  } = data.list[0];

  console.log("Air Quality Details:");
  console.log(`- AQI: ${aqi}`);
  console.log(`- NO2: ${no2}`);
  console.log(`- SO2: ${so2}`);
  console.log(`- PM2.5: ${pm2_5}`);
  console.log(`- O3: ${o3}`);

  const aqiinfo = { aqi, no: no2, so: so2, pm: pm2_5, o: o3 };
  return aqiinfo;
}

//log highlights details
function loghighlightDetails(data) {
  const {
    main: { feels_like, pressure, humidity },
    visibility,
    sys: { sunrise, sunset },
    timezone,
  } = data;

  const sunriset = module.getTime(sunrise, timezone);
  const sunsett = module.getTime(sunset, timezone);

  console.log("Weather Details:");
  console.log(`- Feels Like: ${feels_like}°C`);
  console.log(`- Pressure: ${pressure} hPa`);
  console.log(`- Humidity: ${humidity}%`);
  console.log(`- Visibility: ${visibility / 1000} km`);
  console.log(`- Sunrise: ${sunriset} `);
  console.log(`- Sunset: ${sunsett} `);

  const highlight = {
    feels_like,
    pressure,
    humidity,
    visibility: visibility / 1000,
    sunriset,
    sunsett,
  };
  return highlight;
}

//function to log forecast details
function logdailyforecastDetails(data) {
  const {
    latitude,
    longitude,
    generationtime_ms,
    utc_offset_seconds,
    timezone,
    timezone_abbreviation,
    elevation,
    daily: { time, weather_code, temperature_2m_max, temperature_2m_min },
  } = data;

  console.log("Location:", `Latitude: ${latitude}, Longitude: ${longitude}`);
  console.log("Generation Time (ms):", generationtime_ms);
  console.log("UTC Offset (seconds):", utc_offset_seconds);
  console.log("Timezone:", timezone);
  console.log("Timezone Abbreviation:", timezone_abbreviation);
  console.log("Elevation (m):", elevation);
  // Log daily weather data
  console.log("Daily Forecast:");

  const dailyweather = [];

  // Iterate over the time and weather data and push the data to the dailyweather array
  time.forEach((date, index) => {
    const code = weather_code[index];
    console.log("Weather Code at index", index, ":", code);
    const dailyData = {
      date1: module.getDateopen(date),
      weather_code: code ? module.openicon[code]?.image : "images/default",
      max_temp: Math.floor(temperature_2m_max[index]),
      min_temp: Math.floor(temperature_2m_min[index]),
    };

    dailyweather.push(dailyData);
    console.log(
      `Date: ${dailyweather[index].date1}, Weather Code: ${weather_code[index]}, Max Temp: ${temperature_2m_max[index]}°C, Min Temp: ${temperature_2m_min[index]}°C`
    );
  });

  return dailyweather;
}

function loghourlyforecastDetails(data) {
  const {
    latitude,
    longitude,
    generationtime_ms,
    utc_offset_seconds,
    timezone,
    timezone_abbreviation,
    elevation,
    hourly: {
      time,
      weather_code,
      temperature_180m,
      wind_speed_180m,
      wind_direction_180m,
    },
  } = data;

  const hourlyweather = {
    tz: utc_offset_seconds, // Include utc_offset_seconds as tz
    data: [], // Store hourly data here
  };

  // Logging hourly forecast data
  console.log("Hourly Forecast:");
  time.forEach((t, index) => {
    console.log(
      "-----------------------------------------------------------------------"
    );

    const code = weather_code[index];

    const hourlydata = {
      time: t.split("T")[1],
      //weather_code: code ? module.openicon[code]?.image : "images/default",
      weather_code: module.openicon[code].image,
      temp: temperature_180m[index],
      wind_speed: wind_speed_180m[index],
      wind_dir: wind_direction_180m[index],
    };

    hourlyweather.data.push(hourlydata);
    console.log(hourlyweather.data[index].weather_code);
  });

  return hourlyweather;
}

export async function displayhourlyforecast(coords) {
  const hourlyweatherPromise = new Promise((resolve, reject) => {
    fetchopenData("hourly", coords.lat, coords.lon, (data) => {
      const hourlyweather = loghourlyforecastDetails(data); // Process the data inside the callback
      resolve(hourlyweather); // Resolve the promise with the hourly weather data
    });
  });

  try {
    // Wait for the promise to resolve and get the daily weather data
    const hourlyweather = await hourlyweatherPromise;

    console.log("TIME OFFSET:", hourlyweather.tz); // Correctly logs 32400

    let now = new Date();
    let utcHours = now.getUTCHours();
    let currenttime = utcHours + hourlyweather.tz / 3600; // Convert tz (in seconds) to hours

    // Handle the rollover for times beyond 24 hours
    if (currenttime >= 24) {
      currenttime = currenttime - 24; // Reset to a 24-hour cycle
    }
    if (currenttime < 0) {
      currenttime = 24 + currenttime; // Handle negative time (e.g., UTC-1)
    }

    let formattedTime = String(currenttime).padStart(2, "0") + ":00";
    console.log(formattedTime);

    const hourlytempforecast = document.querySelector("[data-temp]");
    const hourlywindforecast = document.querySelector("[data-wind]");

    let i = 0;

    hourlyweather.data.forEach((hourlyData, index) => {
      if (hourlyData.time >= formattedTime && i <= 24) {
        i++;
        const liforecasttemp = document.createElement("li");
        liforecasttemp.classList.add("slider-item");

        liforecasttemp.innerHTML = `
                <li class="slider-item">
                  <div class="card card-sm slider-card">
                    <p class="body-3">${hourlyData.time}</p>
                    <img src="${hourlyData.weather_code}.png" width="48" height="48" loading="lazy" class="weather-icon" title="">

                    <p class="body-3">${hourlyData.temp}&deg;</p>
                  </div>
                </li>
                
             `;

        hourlytempforecast.appendChild(liforecasttemp);
      }
    });

    i = 0;

    hourlyweather.data.forEach((hourlyData, index) => {
      if (hourlyData.time >= formattedTime && i <= 24) {
        i++;
        const liforecastwind = document.createElement("li");
        liforecastwind.classList.add("slider-item");

        liforecastwind.innerHTML = `
                <li class="slider-item">
                  <div class="card card-sm slider-card">

                    <p class="body-3">${hourlyData.time}</p>
                    <img src="images/direction.png" width="48" height="48" loading="lazy" class="weather-icon" title="" style="transform: rotate(${hourlyData.wind_dir}deg);>

                    <p class="body-3">${hourlyData.wind_speed} km/h </p>

                  </div>

                </li>
                
             `;

        hourlywindforecast.appendChild(liforecastwind);
      }
    });
  } catch (error) {
    console.error("Error fetching daily weather data:", error);
  }
}

export async function displaydayliforecast(coords) {
  const dailyweatherPromise = new Promise((resolve, reject) => {
    fetchopenData("daily", coords.lat, coords.lon, (data) => {
      const dailyweather = logdailyforecastDetails(data); // Process the data inside the callback
      resolve(dailyweather); // Resolve the promise with the dailyweather data
    });
  });

  try {
    // Wait for the promise to resolve and get the daily weather data
    const dailyweather = await dailyweatherPromise;

    const card5 = document.createElement("div");
    card5.classList.add("card", "card-lg", "forecast-card");

    card5.innerHTML = `

            
              <ul>

              <!--Day 0-->
                <li class="card-item">

                  <div class="icon-wrapper">
                    <img src="${dailyweather[0].weather_code}.png" width="36" height="36" class="weather-icon">
                  
                  <p class="title-4" style="color: #AFEEEE;">Min:</p>
                  <span class="span"><p class="title-2" style="color: #AFEEEE;">${dailyweather[0].min_temp}</p></span>
                  <i class="ri-expand-horizontal-s-fill"></i>
                  <p class="title-4" style="color: #F08080;">Max:</p>
                  <span class="span"><p class="title-2" style="color: #F08080;">${dailyweather[0].max_temp}</p></span>
                  </div>


                  <p class="label-1">&nbsp;Today</p>
                  
                  
                </li>
                
                <hr>

                <!--Day 1-->
                <li class="card-item">

                  <div class="icon-wrapper">
                    <img src="${dailyweather[1].weather_code}.png" width="36" height="36" class="weather-icon">
                  
                  <p class="title-4" style="color: #AFEEEE;">Min:</p>
                  <span class="span"><p class="title-2" style="color: #AFEEEE;">${dailyweather[1].min_temp}</p></span>
                  <i class="ri-expand-horizontal-s-fill"></i>
                  <p class="title-4" style="color: #F08080;">Max:</p>
                  <span class="span"><p class="title-2" style="color: #F08080;">${dailyweather[1].max_temp}</p></span>
                  </div>


                  <p class="label-1">&nbsp;${dailyweather[1].date1}</p>
                  
                </li>

                <!--Day 2-->
                <li class="card-item">

                  <div class="icon-wrapper">
                    <img src="${dailyweather[2].weather_code}.png" width="36" height="36" class="weather-icon">
                  
                  <p class="title-4" style="color: #AFEEEE;">Min:</p>
                  <span class="span"><p class="title-2" style="color: #AFEEEE;">${dailyweather[2].min_temp}</p></span>
                  <i class="ri-expand-horizontal-s-fill"></i>
                  <p class="title-4" style="color: #F08080;">Max:</p>
                  <span class="span"><p class="title-2" style="color: #F08080;">${dailyweather[2].max_temp}</p></span>
                  </div>


                  <p class="label-1">&nbsp;${dailyweather[2].date1}</p>
                  
                </li>

                <!--Day 3-->
                <li class="card-item">

                  <div class="icon-wrapper">
                    <img src="${dailyweather[3].weather_code}.png" width="36" height="36" class="weather-icon">
                  
                  <p class="title-4" style="color: #AFEEEE;">Min:</p>
                  <span class="span"><p class="title-2" style="color: #AFEEEE;">${dailyweather[3].min_temp}</p></span>
                  <i class="ri-expand-horizontal-s-fill"></i>
                  <p class="title-4" style="color: #F08080;">Max:</p>
                  <span class="span"><p class="title-2" style="color: #F08080;">${dailyweather[3].max_temp}</p></span>
                  </div>


                  <p class="label-1">&nbsp;${dailyweather[3].date1}</p>
                  
                </li>

                <!--Day 4-->
                <li class="card-item">

                  <div class="icon-wrapper">
                    <img src="${dailyweather[4].weather_code}.png" width="36" height="36" class="weather-icon">
                  
                  <p class="title-4" style="color: #AFEEEE;">Min:</p>
                  <span class="span"><p class="title-2" style="color: #AFEEEE;">${dailyweather[4].min_temp}</p></span>
                  <i class="ri-expand-horizontal-s-fill"></i>
                  <p class="title-4" style="color: #F08080;">Max:</p>
                  <span class="span"><p class="title-2" style="color: #F08080;">${dailyweather[4].max_temp}</p></span>
                  </div>


                  <p class="label-1">&nbsp;${dailyweather[4].date1}</p>
                  
                </li>

                <!--Day 5-->
                <li class="card-item">

                  <div class="icon-wrapper">
                    <img src="${dailyweather[5].weather_code}.png" width="36" height="36" class="weather-icon">
                  
                  <p class="title-4" style="color: #AFEEEE;">Min:</p>
                  <span class="span"><p class="title-2" style="color: #AFEEEE;">${dailyweather[5].min_temp}</p></span>
                  <i class="ri-expand-horizontal-s-fill"></i>
                  <p class="title-4" style="color: #F08080;">Max:</p>
                  <span class="span"><p class="title-2" style="color: #F08080;">${dailyweather[5].max_temp}</p></span>
                  </div>


                  <p class="label-1">&nbsp;${dailyweather[5].date1}</p>
                  
                </li>

              </ul>
            </div>`;

    const dayly5forecast = document.querySelector("[data-5-day-forecast]");
    dayly5forecast.appendChild(card5);
  } catch (error) {
    console.error("Error fetching daily weather data:", error);
  }
}

// Fetch current weather data and log details
//fetchData(url.currentWeather(coords.lat, coords.lon), logWeatherDetails);

//fetchData(url.currentWeather(coords.lat, coords.lon), loghighlightDetails);

//fetchData(url.airPollution(coords.lat, coords.lon), logaqiDetails);

//fetchData(url.reverseGeo(coords.lat, coords.lon), loglocationDetails);

export async function displayLeft(coords) {
  try {
    // Create promises for both weather and location data
    const weatherPromise = new Promise((resolve, reject) => {
      fetchData(url.currentWeather(coords.lat, coords.lon), (weatherData) => {
        if (weatherData && weatherData.weather) {
          const weatherDetails = logWeatherDetails(weatherData);
          resolve(weatherDetails); // Resolve with weather details
        } else {
          reject("Invalid weather data received");
        }
      });
    });

    const locationPromise = new Promise((resolve, reject) => {
      fetchData(url.reverseGeo(coords.lat, coords.lon), (locationData) => {
        if (locationData && locationData[0]) {
          const locationDetails = logLocationDetails(locationData);
          resolve(locationDetails); // Resolve with location details
        } else {
          reject("Invalid location data received");
        }
      });
    });

    // Wait for both promises to resolve using Promise.all
    const [weatherDetails, locationDetails] = await Promise.all([
      weatherPromise,
      locationPromise,
    ]);

    // Display both weather and location details together
    console.log("Weather  retrieved:", weatherDetails);
    console.log("Location retrieved:", locationDetails);

    

    document.body.style.backgroundImage = `url('images/${weatherDetails.icon}.gif')`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";

    const card = document.createElement("div");
    card.classList.add("card", "card-lg", "current-weather-card");

    card.innerHTML = `
         
              <h2 class="title-2 card-title">Now in:</h2>
             


              <div class="wrapper">
                <p class="heading">${Math.floor(
                  weatherDetails.temp
                )}&deg;<sup>C</sup></p>

                <img src="images/${
                  weatherDetails.icon
                }.png" width="64" height="64" class="weather-icon">
              </div>

              <p class="body-3">${weatherDetails.description}</p>

              <ul class="meta-list">
                <li class="meta-item">
                  <span class="m-icon"><i class="ri-calendar-event-line"></i></span>

                  <p class="title-3 meta-text">${weatherDetails.date}</p>
                </li>

                <li class="meta-item">
                  <span class="m-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg></span>

                  <p class="title-3 meta-text">${locationDetails.name} ${
      locationDetails.state
    }, ${locationDetails.country}</p>
                </li>
              </ul>
        
        `;

    const currentweather = document.querySelector("[data-current-weather]");
    currentweather.appendChild(card);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function displayRight(coords) {
  // Create two promises for fetching weather and air quality data
  const weatherPromise = new Promise((resolve, reject) => {
    fetchData(url.currentWeather(coords.lat, coords.lon), (data) =>
      resolve(data)
    );
  });

  const airQualityPromise = new Promise((resolve, reject) => {
    fetchData(url.airPollution(coords.lat, coords.lon), (data) =>
      resolve(data)
    );
  });

  try {
    // Await both promises to resolve
    const weatherData = await weatherPromise;
    const airQualityData = await airQualityPromise;

    // Now process the data
    const aqiDetails = logaqiDetails(airQualityData);
    const highlightDetails = loghighlightDetails(weatherData);

    // Store the arrays
    const aqi = aqiDetails;
    const highlight = highlightDetails;

    // Log the results
    console.log("AQI Details Array:", aqi);
    console.log("Highlight Details Array:", highlight);

    const cardhighlight = document.createElement("div");
    cardhighlight.classList.add( "card-lg", "current-weather-card2");

    cardhighlight.innerHTML = `<div class="card card-lg">
              <h2 class="title-2" id="highlights-label">Today's Highlights</h2>
              
              <div class="highlight-list">

                <div class="card card-sm highlight-card one">
                  <h3 class="title-3">Air Quality Index</h3>

                  <div class="wrapper2">
                    <span class="m-icon"><i class="ri-windy-line"></i></span>

                    <ul class="card-list">
                      <li class="card-item">
                        <p class="title-1">${aqi.pm}</p>
                        <p class="label-1">PM<sub>2.5</sub></p><!--particule matter in air-->
                        
                      </li>

                      <li class="card-item">
                        <p class="title-1">${aqi.so}</p>

                        <p class="label-1">SO<sub>2</sub></p><!--particule matter in air-->
                        
                      </li>

                      <li class="card-item">
                        <p class="title-1">${aqi.no}</p>
                        <p class="label-1">NO<sub>2</sub></p><!--particule matter in air-->
                        
                      </li>

                      <li class="card-item">
                        <p class="title-1">${aqi.o}</p>
                        <p class="label-1">O<sub>2</sub></p><!--particule matter in air-->
                        
                      </li>
                    </ul>
                  </div>

                  <span class="badge aqi-${aqi.aqi} label-1" title="${
      module.aqiText[aqi.aqi].message
    }">
                  ${module.aqiText[aqi.aqi].level}
                  </span>


                </div>

                <div class="card card-sm highlight-card two">
                  <h3 class="title-3">Sunrise & Sunset</h3>
                  <div class="card-list">

                    <div class="card-item">
                      <span class="m-icon"><i class="ri-sun-line"></i></span><!--Change icon to fit sunrise-->

                      <div>
                        <p class="label-1">Sunrise</p>
                        <p class="title-1">${highlight.sunriset}</p>
                      </div>
                    </div>

                    
                    <div class="card-item">
                      <span class="m-icon"><i class="ri-moon-line"></i></span><!--Change icon to fit sunset-->

                      <div>
                        <p class="label-1">Sunset</p>
                        <p class="title-1">${highlight.sunsett}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card card-sm highlight-card">

                  <h3 class="title-3">Humidity</h3>

                  <div class="wrapper2">
                    <span class="m-icon"><i class="ri-water-percent-line"></i></span>
                    <p class="title-1">${highlight.humidity}<sub>%</sub></p>
                  </div>

                </div>

                <div class="card card-sm highlight-card">

                  <h3 class="title-3">Pressure</h3>

                  <div class="wrapper2">
                    <span class="m-icon"><i class="ri-align-bottom"></i></span>
                    <p class="title-1">${highlight.pressure}<sub>hPa</sub></p>
                  </div>

                </div>

                <div class="card card-sm highlight-card">

                  <h3 class="title-3">Visibility</h3>

                  <div class="wrapper2">
                    <span class="m-icon"><i class="ri-eye-line"></i></span>
                    <p class="title-1">${highlight.visibility}<sub>km</sub></p>
                  </div>

                </div>

                <div class="card card-sm highlight-card">

                  <h3 class="title-3">Feels Like</h3>

                  <div class="wrapper2">
                    <span class="m-icon"><i class="ri-temp-cold-line"></i></span>
                    <p class="title-1">${
                      highlight.feels_like
                    }&deg;<sub>C</sub></p>
                  </div>

                </div>

              </div>

            </div>`;

    const currenthighlight = document.querySelector("[data-highlights]");
    currenthighlight.appendChild(cardhighlight);

    // Return the arrays
    return { aqi, highlight };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
