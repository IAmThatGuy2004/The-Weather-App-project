# Documentation of weather-api.js

This document is made to manage all api keys and calls accordingly. We try to avoid mixing up functions and the god class anti pattern via these seperations. here we have urls and function responsible to call those api responses to fetch needed data and submit to caller functions.

## `fetchopenData(URL, callback)`
**Purpose:** This function is a generic data-fetching utility designed to interact with APIs. It takes a URL and a callback function, fetches data from the provided URL, and passes the resulting JSON data to the callback.

**Parameters:**
- `URL`: The URL endpoint to fetch data from.
- `callback`: A function that will process the fetched data.

**How it works:**
- The fetch API sends a GET request to the specified URL with the appended api_key.
- The response is parsed into JSON format.
- The parsed data is passed to the callback function.

---

## `fetchData(URL, callback)`
**Purpose:** Similar purpose as fetchData, only this one is made for the new open-Meteo api. It dynamically constructs URLs for Open-Meteo API requests based on the forecastType and geographical coordinates.

**Parameters:**
- `forecastType`: A string specifying the type of forecast data required (e.g., `hourly` or `daily`).
- `lat`: Latitude of the location.
- `lon`: Longitude of the location.
- `callback`: A function to handle the fetched data.

**How it Works:**
1. Verifies that `forecastType` matches a key in the `openurl` object.
2. If valid, generates a URL dynamically using the corresponding method in `openurl`.
3. Fetches data from the generated URL and passes the JSON response to the `callback` function.

---

## `url` Object

### Purpose:
Contains methods for constructing OpenWeather API URLs.

### Methods:

- `currentWeather(lat, lon)`:
  - Contains URL call for current weather information made by OpenWeather API, Dynamically fetch location info through `(lat, lon)`

- `forecast(lat, lon)`:
  - Generates a URL to fetch 5-day weather forecasts for a location.

- `airPollution(lat, lon)`:
  - Constructs a URL to fetch air pollution data for a specific location.

- `reverseGeo(lat, lon)`:
  - Generates a URL for reverse geocoding, fetching location details (like city name) based on latitude and longitude.

- `Geo(query)`:
  - Constructs a URL to fetch geographical data (like latitude and longitude) for a city based on a search query (e.g., "Kelowna").
---

## `openurl` Object

### Purpose:
Similar to URL but for Open Meteo API, Contains methods for constructing Open-Meteo API URLs.

### Methods:
- **`hourly(lat, lon)`**:
  - Generates a URL to fetch hourly forecasts, including:
    - Temperature.
    - Weather codes.
    - Wind speed and direction.
    - Sunrise and sunset times.
    - And timezones.

- **`daily(lat, lon)`**:
  - Constructs a URL to fetch daily forecasts, including:
    - Weather codes.
    - Maximum and minimum temperatures for each day.

---

### Reusability:
Both `url` and `openurl` objects abstract away the details of URL construction, allowing the fetching functions to remain clean and dynamic.



