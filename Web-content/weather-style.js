
'use strict';

const api_key = "6d7d8491e5e2c3a0173e9d4c2ff5ddbd";

export const fetchData = function(URL, callback){
    fetch(`${URL}&appid=${api_key}`)
    .then(res => res.json())  // Removed unnecessary semicolon
    .then(data => callback(data))  // Now this will be executed
   }


   //current-whether: https://api.openweathermap.org/data/2.5/weather?lat=23.7644025&lon=90.389015&units=metric&appid=your_api
   //current by city: https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${weatherkey}
   
   //5 days forecast: https://api.openweathermap.org/data/2.5/forecast?lat=40.7127281&lon=-74.0060152&units=metric&appid=your_api
   //air polution: http://api.openweathermap.org/data/2.5/air_pollution?lat=23.251314&lon=90.851784&appid=your_api
   //geocoding: http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=your_api
   //geocoding-reverse:http://api.openweathermap.org/geo/1.0/reverse?lat=23.7644025&lon=90.389015&limit=5&appid=your_api