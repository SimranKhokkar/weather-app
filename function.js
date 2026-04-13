var request = require('request');



function getLocation(place,callback){
let apikey=env.apiKey;
let url= 'https://maps.googleapis.com/maps/api/geocode/json?address='+place+'&key='+apikey;
request(url, function (error, response, body) {
    var body = JSON.parse(body);
    if(error){
      callback(error);
    }else if(body.status == "OK") {
      callback(null,{'lng':body.results[0].geometry.location.lng,
                      'lat':body.results[0].geometry.location.lat
                    });
    }
  });
}

function getWeather(lat,lng,callback){
  let  apikey=env.weatherApiKey;
  url= 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid='+apikey;
  request(url, function (error, response, body) {
    var body = JSON.parse(body);
    if(error){
      callback(error);
    }
    else{
      callback(null,body.main);
    }
  });
}

module.exports={
  getLocation,getWeather
};
