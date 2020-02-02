const request = require('request');

const forecast = (latitude,longitude,callback) => {
   const url=`https://api.darksky.net/forecast/ac15f1ec411d9d3b953ed12934a6cbf0/${latitude},${longitude}?units=si&lang=en`;

   request({url,json:true},(error,{body})=>{
      if(error){
         callback('Unable to connect to weather service',undefined);
      }else if(body.error){
         callback('Unable to find location.',undefined);
      }else{
         callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degree out. There is a ${body.currently.precipProbability}% chance of rain.`);
      }
   });
}
module.exports = forecast;