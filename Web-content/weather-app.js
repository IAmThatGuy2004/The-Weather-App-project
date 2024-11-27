import * as weatherApi from './weather-api.js';
import * as weatherModule from './weather-module.js';

"use strict";

const searchToggler = document.querySelectorAll('[data-search-toggler]');
const searchView = document.querySelector('[data-search-view]');
const searchResult = document.querySelector('[data-search-result]');
const searchLocation = document.querySelectorAll('[data-search-location]'); // Assuming these are within the search-result

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