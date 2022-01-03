//creating new node app
const express = require("express");
//native node module so no need to install
const https = require("https");
//bodyParser to look through the body of post request
const bodyParser = require("body-parser");


//it will initialise new express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "cc84a706c55875fd2edcbe2b0d629984";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + "";
    https.get(url, function (response) {
        console.log('response.statusCode');
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description
            const city = weatherData.name
            const country = weatherData.sys.country
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Weather is currently ----- " + description + "</h1>");

            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius </h1>");

            res.write("<h1>City is " + city + "</h1>");

            res.write("<h1>Country is " + country + "</h1>");

            res.write("<img src=" + imageURL + ">");

            res.send();
        })
    })
});





app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});