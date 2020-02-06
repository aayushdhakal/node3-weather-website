const path = require('path');
const express = require('express');
const hbs = require('hbs');
console.log('hello');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port =process.env.PORT || 3000;
const creatorName ='Aayush dh'

//Define path for Express config
const publicDirectorypath = path.join(__dirname,'../public');//path for static pages and css or javascript for front end
const viewsPath = path.join(__dirname,'../templates/views');//for view path for handlers
const partialsPath = path.join(__dirname,'../templates/partials');// Path for partials

//Setup handlebars engine and views location
app.set('view engine','hbs');//handelbars for the content that use same code
app.set('views',viewsPath);//new directory for handlers from views to templates
hbs.registerPartials(partialsPath);//take the path for partial html (header and footer in our case)

//Setup static directory to serve
app.use(express.static(publicDirectorypath));


app.get('',(req,res)=>{//route handler
   res.render('index',{
      title:'Weather',
      name:creatorName
   }); // index.hbs 
});

app.get('/about',(req,res)=>{
   res.render('about',{
      title:'About Me',
      name:creatorName,
      information:'This site is created by Aayush.It uses data from the mapbox.com and darksky.net'
   });//about.hbs
});

app.get('/help',(req,res)=>{
   res.render('help',{
      helpText:'This site is used to gather information regarding the weather and it provides the information of current weather',
      title:'Help',
      name:creatorName
   });
});
 
//Goal api 
app.get('/weather',(req,res)=>{
   if(!req.query.address){
      return res.send({
         error:'You must provide an address'
      });
   }
   geocode(req.query.address,(error,{longitude,latitude,location} = {})=>{
      if(error){
         return res.send({ error });
      }
      forecast(latitude,longitude,(error,forecastData)=>{
         if(error){
            return res.send({ error });
         }

         res.send({
            forecast:forecastData,
            location,
            address:req.query.address
         });
      });
   });
});

app.get('/products',(req,res)=>{
   if(!req.query.search){
      return res.send({
         error:'you must provide a search term'
      });
   }
   
   res.send({
      products:[]
   });
});

//This is error in page 404 error in help/* content
app.get('/help/*',(req,res)=>{
   res.render('404',{
      title:'404 error',
      name:creatorName,
      errorMessage:'Help article not found'
   });
});

//this is wild card entry which is define and used for 404 error
app.get('*',(req,res)=>{
   res.render('404',{
      title:'404',
      name:creatorName,
      errorMessage:'Page not found'
   });
});

app.listen(port,()=>{
      console.log('Express is up and running in the port '+port);
});