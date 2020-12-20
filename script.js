console.log("this is linked");
// variables
var apiKey = "676649a33e95382fb9220015cd3bcce8";
var city = "Bellingham";
var lat = "48";
var lon = "122";
var queryURLWeather =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey +
  "&units=metric";

var queryURLForecast =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  apiKey +
  "&units=metric";

var queryURLUV =
  "http://api.openweathermap.org/data/2.5/uvi?lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  apiKey;
// api function
$.ajax({
  url: queryURLWeather,
  method: "GET",
}).then(function (currentWeather) {
  console.log(currentWeather);
  //   image of current weather

  var statusIMG = $("<img>");
  statusIMG.attr(
    "src",
    "http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png"
  );
  // current city selected
  var currentCityHead = $("<h2>");
  currentCityHead.text(city);
  $(".current-city").append(currentCityHead);
  currentCityHead.append(statusIMG);
  // current temp
  var temp = $("<h2>");
  temp.text(" Tempature: " + Math.ceil(currentWeather.main.temp) + " Celcius");
  $(".temp").append(temp);
  // current Humidity
  var humid = $("<h2>");
  humid.text("Humidity: " + currentWeather.main.humidity + "%");
  $(".humidity").append(humid);
  // current windspeed
  var windSpeed = $("<h2>");
  windSpeed.text("Wind Speed: " + currentWeather.wind.speed + " KPH");
  $(".wind-speed").append(windSpeed);
});
// UV Index section
$.ajax({
  url: queryURLUV,
  method: "GET",
}).then(function (UVINDEX) {
  console.log(UVINDEX);

  var uvIndex = $("<h2>");
  var uvSpan = $("<span>");
  uvIndex.text("UV Index: " + UVINDEX.value);

  if (uvIndex < 3) {
    newSpan.attr("style", "background-color: green;");
  }

  if (uvIndex < 6) {
    newSpan.attr("style", "background-color: yellow;");
  }
  if (uvIndex < 8) {
    newSpan.attr("style", "background-color: orange;");
  }
  if (uvIndex < 11) {
    newSpan.attr("style", "background-color: red");
  }

  $(".uvindex").append(uvIndex);
  uvIndex.append(uvSpan);
});

// five day future forecast
$.ajax({
  url: queryURLForecast,
  method: "GET",
}).then(function (fiveDayForecast) {
  console.log(fiveDayForecast);
  $("#five-day-forcast").empty();

  for (let i = 0; i < fiveDayForecast.list.length; i += 8) {
    //   created html elements to append to
    var cardDiv = $("<div>");
    cardDiv.attr("class", "card");
    var listUl = $("<ul>");

    // info form forcast to create li out of
    var day = fiveDayForecast.list[i].dt_txt;
    var dayTemp = Math.ceil(fiveDayForecast.list[i].main.temp);
    var dayHum = fiveDayForecast.list[i].main.humidity;
    var dayWindSpd = fiveDayForecast.list[i].wind[0];

    // creating li items & append
    var dayLI = $("<li>");
    dayLI.text(day.slice(0, 10));
    listUl.append(dayLI);

    var tempLI = $("<li>");
    tempLI.text("Temp: " + dayTemp + "C");
    listUl.append(tempLI);

    var humLI = $("<li>");
    humLI.text("Humidity: " + dayHum);
    listUl.append(humLI);

    var windLI = $("<li>");
    windLI.text("Wind Speed: " + dayWindSpd);
    listUl.append(windLI);

    // append ul to div and div to html
    cardDiv.append(listUl);
    $("#five-day-forecast").append(cardDiv);
  }
});

// search and history search feature
