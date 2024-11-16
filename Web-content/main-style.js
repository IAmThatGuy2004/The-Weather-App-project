

let geoloc = document.getElementById('city-weather');


//we create array containing different images, we have a random number ranging from 0 to size of our image array
//our function then randomly calls a picture from the array to become our bakcround 
//this allows for different picture to become our backround as page gets refreshed.
const backimage = [];

// Add your images
backimage[0] = 'images/weather-rainbow.jpg';
backimage[1] = 'images/snowy-nature-weather.jpg';
backimage[2] = 'images/rainy-wallpaper.jpg';

// Only set window.onload if we're in a browser environment
if (typeof window !== 'undefined') {
  window.onload = function() {
    const random = Math.floor(Math.random() * backimage.length);
    document.body.style.backgroundImage = `url(${backimage[random]})`;
  };
}

let cityname = "";

async function fetchCity() {
  let url = 'https://ipinfo.io/json?token=10176eb7d5bfd1';
  let response = await fetch(url);  // Fetch data from the URL
  let data = await response.json();  // Parse the JSON response
  cityname = data.city;  // Update the global cityname variable
  return cityname;  // Return the city name
}

// Function that uses cityname
async function useCityName() {
  await fetchCity();  // Ensure fetchCity() finishes before using cityname
  console.log("The city name is:", cityname);  // Use cityname here
}
useCityName();

const weatherkey = "6d7d8491e5e2c3a0173e9d4c2ff5ddbd";

async function getweatherdata() {
  await fetchCity();  // Ensure fetchCity() finishes before using cityname
  console.log("The city name is:", cityname); 

    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${weatherkey}`;
    let response2 = await fetch(apiurl);

    // Parse the JSON response
    let data = await response2.json();
    
    console.log("Weather data:", data);


    const {name: city, 
      main: {temp, humidity}, 
      weather: [{description, id}]} = data;

      geoloc.textContent = "";

      console.log(city);
      console.log(`${(temp - 273.15).toFixed(1)}°C`);
      console.log(`Humidity: ${humidity}%`);
      console.log(description);
      
  
      const cityDisplay = document.createElement("h1");
      const tempDisplay = document.createElement("p");
      const humidityDisplay = document.createElement("p");
      const descDisplay = document.createElement("p");
      const weatherEmoji = document.createElement("p");
  
      cityDisplay.textContent = city;
      tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
      humidityDisplay.textContent = `Humidity: ${humidity}%`;
      descDisplay.textContent = description;
      
  
      cityDisplay.classList.add("cityDisplay");
      tempDisplay.classList.add("tempDisplay");
      humidityDisplay.classList.add("humidityDisplay");
      descDisplay.classList.add("descDisplay");
      
  
      geoloc.appendChild(cityDisplay);
      geoloc.appendChild(tempDisplay);
      geoloc.appendChild(humidityDisplay);
      geoloc.appendChild(descDisplay);
      //card.appendChild(weatherEmoji);

}

getweatherdata(); // Ensure you call the function to initiate the request


//module.exports = { fetchCity };
