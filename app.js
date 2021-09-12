//jshint esversion:6
const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey="368f146afd51a96395658668d78d55e7";
  const units= "Metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ units;
  https.get(url, function(response){
    response.on("data", function(data){

      const weatherData = JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const iconImage="http://openweathermap.org/img/wn/"+weatherIcon+".png";
      res.write("<h1>The temperature in "+query+" is " + temp + " degrees C</h1>");
      res.write("<p>The weather currently is " + weatherDescription + "</p>");
      res.write("<img src=" + iconImage + ">");
      res.send();
    });
  });
});




app.listen(3000, function(){
  console.log('server running');
});
