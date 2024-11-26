'use strict';

import { updateWeather, error404} from "weather-app.js";
const defaultLocation = "#/weather?lat=49.88307&lon=-119.48568"  //lat and lon of Kelowna, will later implement way to auto retrieve

const currentLocation = function(){
window.navigator.geolocation.getCurrentPosition(res => {
    const{latitude, longitude}=res.coords;

    updateWeather(`lat=${latitude}`,`lon=${longitude}`);
}, err=>{
    window.location.hash = defaultLocation;
});
}

const searchedLocation = query =>updateWeather(...query.split("&"));
// updateWeather("lat=49", "lon=-119")

const routes = new Map([

    ["/current-location", currentLocation],
    ["/weather", searchedLocation]

]);

const checkHash=function(){
   const requestURL = window.location.hash.slice(1);

   const[route, query]= requestURL.includes ? requestURL.split("?") :[requestURL];

   routes.get(route) ? routes.get(route)(query) : error404();
}


window.addEventListener("hashchange", checkHash);

window.addEventListener( "load", function() {
    
    if(!window.location.hash){
        window.location.hash = "#/current-location";
    }else{
        checkHash();
    }
});

