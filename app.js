var express = require('express');
var app = express();
var https = require ("https");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",function(req,res)
{
    var city=req.body.YourCity;
    var measurementUnit=req.body.scale;
   var url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=10905087bfc2b71150451b90437dac60&units="+measurementUnit;
    https.get(url,function(response)
    {
        console.log(response);
        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherdes = weatherData.weather[0].description;
            console.log(weatherdes);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>The weather is currently "+weatherdes+".<h1>")
          res.write("<h1>The Temperature in "+city+" is:- "+temp+" degree "+ measurementUnit+".</h1>");
          res.write("<img src="+imageURL+">");
          res.send();
        })
        
    })
});


app.listen(3000,function()
{
    console.log("Server is running at port 3000.")
});