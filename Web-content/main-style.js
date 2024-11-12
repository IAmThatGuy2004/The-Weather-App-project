
const backimage = [];

backimage[0]='images/aurora-sky.jpg';
backimage[1]='images/weather-rainbow.jpg';
backimage[2]='images/snowy-nature-weather.jpg';
backimage[3]='images/rainy-wallpaper.jpg';

window.onload  = function(){
    const random = Math.floor(Math.random() * backimage.length);
    
    document.body.style.backgroundImage = `url(${backimage[random]})`;
}