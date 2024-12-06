# Documentation of weather-route.js

This document is used for extracting coordinates from url approprialty to then send to the needed function imported to be displayed dynamically accordingly.

---

## **Imports**

- **`weather-app.js`**: This module is imported as `app` and contains functions such as:
  - `displayLeft`
  - `displayRight`
  - `displaydayliforecast`
  - `displayhourlyforecast`

These functions are responsible for rendering various sections of the weather data on the UI.

---

## **Functionality**

### `getCoordinatesFromURL`

#### **Purpose:**
- Extracts latitude and longitude from the URL's hash fragment.
- Prints a message to the console based on the availability of coordinates.
- Returns the coordinates as an object.

#### **Implementation:**
1. **Retrieve Current URL**:
   - The `window.location.href` is used to get the full current URL.
2. **Initialize Coordinates Object**:
   - An object `coordinates` is created with `lat` and `lon` set to `null`.
3. **Check for `#/weather` in URL**:
   - Verifies if the hash fragment contains the weather page identifier (`#/weather`).
4. **Extract Query Parameters**:
   - If the hash fragment includes `?`, the query parameters (e.g., `lat` and `lon`) are extracted using `URLSearchParams`.
5. **Update Coordinates**:
   - The `coordinates` object is updated with the extracted `lat` and `lon` values.
6. **Log Messages**:
   - Prints a confirmation message to the console if coordinates are found.
   - Logs appropriate messages if coordinates or query parameters are missing.

#### **Return Value:**
- Returns the `coordinates` object  which will be used when calling the functions from the `app` import