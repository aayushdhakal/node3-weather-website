const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();


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
      name:'Aayush Dh'
   }); // index.hbs 
});

app.get('/about',(req,res)=>{
   res.render('about',{
      title:'About Me',
      name:'Aayush'
   });//about.hbs
});

app.get('/help',(req,res)=>{
   res.render('help',{
      helpText:'This is some helpful text',
      title:'Help',
      name:'Aayush'
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
      name:'Aayush dh',
      errorMessage:'Help article not found'
   });
});

//this is wild card entry which is define and used for 404 error
app.get('*',(req,res)=>{
   res.render('404',{
      title:'404',
      name:'Aayush Dh',
      errorMessage:'Page not found'
   });
});

app.listen(3000,()=>{
      console.log('Express is up and running in the port 3000');
});