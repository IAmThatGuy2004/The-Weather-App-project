import { fetchData, url } from "./weather-api.js";
import * as module from "./weather-module.js";

"use strict";

const searchToggler = document.querySelectorAll('[data-search-toggler]');
const searchView = document.querySelector('[data-search-view]');
const searchResult = document.querySelector('[data-search-result]');
const searchLocation = document.querySelectorAll('[data-search-location]');


// Function to set default location based on user's current position
function setDefaultLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Update the URL to include the user's location by latitude and longitude 
        const defaultURL = `#/weather?lat=${lat}&lon=${lon}`;
        if (window.location.hash !== defaultURL) {
          window.location.hash = defaultURL; // Set the hash part of the URL
        }

      },
      (error) => {
        console.error("Geolocation error:", error.message);
        // Handle location retrieval error (fallback logic)
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    // Handle lack of geolocation support
  }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", setDefaultLocation);


// Toggle search view and result on toggler click
searchToggler.forEach(toggler => {
  toggler.addEventListener('click', () => {
    searchView.classList.toggle('active');
    searchResult.classList.toggle('active');
  });
});

// Close search-view and search-result when a location is selected
searchLocation.forEach(location => {
  location.addEventListener('click', () => {
    searchView.classList.remove('active');
    searchResult.classList.remove('active');
  });
});

/**
 * SEARCH INTEGRATION
 */
const searchField = document.querySelector("[data-search-field]");
let searchTimeout = null;
const serachTimeoutDuration = 500;

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

        searchResult.querySelector("[data-search-list]").appendChild(searchItem);
        items.push(searchItem.querySelector("[data-search-toggler]"));
      }

      // Add event listeners to search items
      items.forEach(item => {
        item.addEventListener("click", () => {
          searchView.classList.remove("active");
          searchResult.classList.remove("active");
        });
      });
    });
  }, serachTimeoutDuration);
});

// Additional UI elements
const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");
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
      console.log(`Hello world, your latitude is: ${latitude} and longitude is: ${longitude}`);
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
const coords=logCoordinatesFromHash();

console.log(`hello world  ${coords.lat} ,  ${coords.lon}`);




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
  console.log(`- Feels Like: ${feels_like}°C`);
  console.log(`- Pressure: ${pressure} hPa`);
  console.log(`- Humidity: ${humidity}%`);
  console.log("Additional Info:");
  console.log(`- Visibility: ${visibility} meters`);
  console.log(`- Sunrise: ${module.getTime(sunrise, timezone)}`);
  console.log(`- Sunset: ${module.getTime(sunset, timezone)}`);
  console.log(`- Date: ${module.getDate(dt, timezone)}`);


  /*
      const cityDisplay = document.createElement("h1");
      const tempDisplay = document.createElement("p");
      const humidityDisplay = document.createElement("p");
      const descDisplay = document.createElement("p");
      const weatherEmoji = document.createElement("p");
  
      cityDisplay.textContent = city;
      tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
      humidityDisplay.textContent = `Humidity: ${humidity}%`;
      descDisplay.textContent = description;
      weatherEmoji.textContent = getWeatherEmoji(id);
  
      cityDisplay.classList.add("cityDisplay");
      tempDisplay.classList.add("tempDisplay");
      humidityDisplay.classList.add("humidityDisplay");
      descDisplay.classList.add("descDisplay");
      weatherEmoji.classList.add("weatherEmoji");
  
      geoloc.appendChild(cityDisplay);
      geoloc.appendChild(tempDisplay);
      geoloc.appendChild(humidityDisplay);
      geoloc.appendChild(descDisplay);
      geoloc.appendChild(weatherEmoji);


*/

}

//function to log location details
function loglocationDetails(data) {
  console.log("Raw API response:", data);

  const {
    name,
    country,
    state,
  } = data[0];

  console.log("cityDetails:");
  console.log(`- City: ${name}`);
  console.log(`- Country: ${country}`);
  console.log(`- State: ${state}`);
 

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
function logforecastDetails(data) {
 
 
}


 


// Fetch current weather data and log details
fetchData(url.currentWeather(coords.lat ,  coords.lon), logWeatherDetails);

fetchData(url.currentWeather(coords.lat ,  coords.lon), loghighlightDetails);

fetchData(url.airPollution(coords.lat ,  coords.lon), logaqiDetails);
fetchData(url.reverseGeo(coords.lat ,  coords.lon), loglocationDetails);

