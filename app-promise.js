// const request=require('request');
const yargs=require('yargs');
const axios=require('axios');

const argv=yargs
.options({
  a:{
    demand:true,
    alias:'address',
    describe:'address of a place',
    string:true
  }
})
.help()
.alias('help','h')
.argv;

var encodedAddress=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=`+encodedAddress;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status ==='ZERO_RESULTS')
  {
    throw new Error('Unable to find the given address.');
  }
  var latitude=response.data.results[0].geometry.location.lat;
  var longitude=response.data.results[0].geometry.location.lng;
  var weatherUrl='https://api.darksky.net/forecast/7ad734c023927c55bf4ba9e35a50bb40/'+latitude+','+longitude
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature =response.data.currently.temperature;
  var apparentTemperature= response.data.currently.apparentTemperature;
  console.log('Temperature:'+temperature);
  console.log('Apparent Temperature:'+apparentTemperature);
}).catch((e) => {
  if(e.code === 'ENOTFOUND')
  {
      console.log('Unable to connect to the server.');
  }
else {
  console.log(e.message);
}
});
