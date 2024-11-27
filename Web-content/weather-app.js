import { fetchData, url } from "./weather-api.js";
import * as module from "./weather-module.js";

"use strict";

const searchToggler = document.querySelectorAll('[data-search-toggler]');
const searchView = document.querySelector('[data-search-view]');
const searchResult = document.querySelector('[data-search-result]');
const searchLocation = document.querySelectorAll('[data-search-location]');

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
