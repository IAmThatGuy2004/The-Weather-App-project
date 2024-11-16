
//we create array containing different images, we have a random number ranging from 0 to size of our image array
//our function then randomly calls a picture from the array to become our bakcround 
//this allows for different picture to become our backround as page gets refreshed.
const backimage = [];


backimage[0]='images/weather-rainbow.jpg';
backimage[1]='images/snowy-nature-weather.jpg';
backimage[2]='images/rainy-wallpaper.jpg';

window.onload  = function(){
    const random = Math.floor(Math.random() * backimage.length);
    
    document.body.style.backgroundImage = `url(${backimage[random]})`;
}

async function fetchcity() {
    let url = 'https://ipinfo.io/json?token=10176eb7d5bfd1';
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}
fetchcity();




