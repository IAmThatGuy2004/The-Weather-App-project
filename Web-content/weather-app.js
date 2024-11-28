import { fetchData, url } from "./weather-api.js";
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
    state
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
}

//log highlights details
function loghighlightDetails(data) {
  const {
    main: { feels_like, pressure, humidity },
    visibility,
  } = data;

  console.log("Weather Details:");
  console.log(`- Feels Like: ${feels_like}°C`);
  console.log(`- Pressure: ${pressure} hPa`);
  console.log(`- Humidity: ${humidity}%`);
  console.log(`- Visibility: ${visibility / 1000} km`);
}

//function to log forecast details
function logforecastDetails(data) {}

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
          reject('Invalid weather data received');
        }
      });
    });

    const locationPromise = new Promise((resolve, reject) => {
      fetchData(url.reverseGeo(coords.lat, coords.lon), (locationData) => {
        if (locationData && locationData[0]) {
          const locationDetails = logLocationDetails(locationData);
          resolve(locationDetails); // Resolve with location details
        } else {
          reject('Invalid location data received');
        }
      });
    });

    // Wait for both promises to resolve using Promise.all
    const [weatherDetails, locationDetails] = await Promise.all([weatherPromise, locationPromise]);

    // Display both weather and location details together
    console.log('Weather  retrieved:', weatherDetails);
    console.log('Location retrieved:', locationDetails);


    const card = document.createElement("div");
        card.classList.add("card", "card-lg", "current-weather-card");

        card.innerHTML = `
         
              <h2 class="title-2 card-title">Now in:</h2>
             


              <div class="wrapper">
                <p class="heading">${Math.floor(weatherDetails.temp)}&deg;<sup>C</sup></p>

                <img src="images/${weatherDetails.icon}.png" width="64" height="64" class="weather-icon">
              </div>

              <p class="body-3">${weatherDetails.description}</p>

              <ul class="meta-list">
                <li class="meta-item">
                  <span class="m-icon"><i class="ri-calendar-event-line"></i></span>

                  <p class="title-3 meta-text">${weatherDetails.date}</p>
                </li>

                <li class="meta-item">
                  <span class="m-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg></span>

                  <p class="title-3 meta-text">${locationDetails.name} ${locationDetails.state}, ${locationDetails.country}</p>
                </li>
              </ul>
        
        `;

        const currentweather = document.querySelector("[data-current-weather]");
        currentweather.appendChild(card);


  } catch (error) {
    console.error('Error fetching data:', error);
  }

  
}






