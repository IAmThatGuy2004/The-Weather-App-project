
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

async function fetchCity() {
  let url = 'https://ipinfo.io/json?token=10176eb7d5bfd1';
  let response = await fetch(url);  // Fetch data from the URL
  let data = await response.json();  // Parse the JSON response
  console.log(data.city);
  return `${data.city}`;  // Corrected string interpolation with backticks
}

//fetchCity().then(cityWeatherText => {
 // document.getElementById('city-weather').innerText = cityWeatherText;
//})
// Export the function so it can be used elsewhere
//module.exports = { fetchCity };

const weatherkey = "6d7d8491e5e2c3a0173e9d4c2ff5ddbd";
const city = "kelowna"; // Directly get the city

async function getweatherdata(city) {

    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherkey}`;
    let response2 = await fetch(apiurl);

    // Parse the JSON response
    let data = await response2.json();
    
    console.log("Weather data:", data);

}

getweatherdata(city); // Ensure you call the function to initiate the request
