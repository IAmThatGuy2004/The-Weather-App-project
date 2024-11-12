
const backimage = [];


backimage[0]='images/weather-rainbow.jpg';
backimage[1]='images/snowy-nature-weather.jpg';
backimage[2]='images/rainy-wallpaper.jpg';

window.onload  = function(){
    const random = Math.floor(Math.random() * backimage.length);
    
    document.body.style.backgroundImage = `url(${backimage[random]})`;
}