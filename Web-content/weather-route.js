import * as app  from "./weather-app.js";


// Function to extract lat and lon from the URL and print the message
function getCoordinatesFromURL() {
  // Get the current URL
  const currentURL = window.location.href;

  // Initialize an empty coordinates object
  const coordinates = { lat: null, lon: null };

  // Check if the URL has a hash fragment
  if (currentURL.includes('#/weather')) {
    // Extract the part of the URL after the hash '#/weather'
    const hashFragment = currentURL.split('#/weather')[1];

    // Check if hash has the query parameters (lat and lon)
    if (hashFragment.includes('?')) {
      const queryParams = hashFragment.split('?')[1]; // Get the query string after '?'
      const params = new URLSearchParams(queryParams); // Use URLSearchParams to parse query parameters

      const latitude = params.get('lat');
      const longitude = params.get('lon');

      // Update the coordinates object
      coordinates.lat = latitude;
      coordinates.lon = longitude;

      // Check if both latitude and longitude are available
      if (latitude && longitude) {
        console.log(`yellow world: your latitude is: ${latitude} and longitude is: ${longitude}`);
      } else {
        console.log('Latitude and/or Longitude not found in the URL');
      }
    } else {
      console.log('Query parameters not found in the hash fragment');
    }
  } else {
    console.log('No weather page in the URL');
  }

  

  return coordinates;
}

// Call the function to retrieve the coordinates and print them
const coord = getCoordinatesFromURL();


app.displayLeft(coord);
app.displayRight(coord);
app.displaydayliforecast(coord);
app.displayhourlyforecast(coord);

window.addEventListener("hashchange", () => {
  // Reload the page whenever the link changes
  location.reload();
});









