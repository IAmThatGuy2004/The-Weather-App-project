
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