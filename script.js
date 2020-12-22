console.log("this is linked");
// variables
var apiKey = "676649a33e95382fb9220015cd3bcce8";
var userHistory = [];
// localStorage.getItem(JSON.parse(button, userHistory)) || [];

$("#submit").on("click", function () {
  event.preventDefault();
  $(".current-city").empty();
  $(".temp").empty();
  $(".humidity").empty();
  $(".wind-speed").empty();
  $(".uvindex").empty();
  $("#five-day-forecast").empty();
  console.log("I hath been clicked");
  var city = $("#City").val();

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

  // api function
  $.ajax({
    url: queryURLWeather,
    method: "GET",
  }).then(function (currentWeather) {
    console.log(currentWeather);

    // user history

    userHistory.push(city);
    console.log(userHistory);

    for (let i = 0; i < userHistory.length; i++) {
      var button = $("<button>");
      button.attr("class", "history-btn");
      button.text(userHistory[i]);
      $("#history").prepend(button);
      console.log(button);
    }

    localStorage.setItem(JSON.stringify(button), JSON.stringify(userHistory));

    //   image of current weather
    var statusIMG = $("<img>");
    statusIMG.attr(
      "src",
      "http://openweathermap.org/img/w/" +
        currentWeather.weather[0].icon +
        ".png"
    );
    // current city selected
    var currentCityHead = $("<h2>");
    currentCityHead.text(city);
    $(".current-city").append(currentCityHead);
    currentCityHead.append(statusIMG);
    // current temp
    var temp = $("<h2>");
    temp.text(
      " Tempature: " + Math.ceil(currentWeather.main.temp) + " Celcius"
    );
    $(".temp").append(temp);

    // current Humidity
    var humid = $("<h2>");
    humid.text("Humidity: " + currentWeather.main.humidity + "%");
    $(".humidity").append(humid);

    // current windspeed
    var windSpeed = $("<h2>");
    windSpeed.text("Wind Speed: " + currentWeather.wind.speed + " KPH");
    $(".wind-speed").append(windSpeed);

    var lon = currentWeather.coord.lon;
    var lat = currentWeather.coord.lat;

    var queryURLUV =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;

    // UV Index section
    $.ajax({
      url: queryURLUV,
      method: "GET",
    }).then(function (UVINDEX) {
      console.log(UVINDEX);

      var uvIndex = $("<h2>");
      var uvSpan = $("<span>");
      uvIndex.text("UV Index: ");
      uvSpan.text(UVINDEX.value);
      var uvcheck = UVINDEX.value;

      if (uvcheck < 3) {
        uvSpan.css("background-color", "green");
        console.log("this is true");
      }

      if (uvIndex < 6 && uvcheck >= 3) {
        uvSpan.attr("style", "background-color: yellow;");
      }
      if (uvIndex < 8 && uvcheck >= 6) {
        uvSpan.attr("style", "background-color: orange;");
      }
      if (uvIndex < 11 && uvcheck >= 8) {
        uvSpan.attr("style", "background-color: red");
      }

      $(".uvindex").append(uvIndex);
      uvIndex.append(uvSpan);
    });
  });

  // five day future forecast
  $.ajax({
    url: queryURLForecast,
    method: "GET",
  }).then(function (fiveDayForecast) {
    console.log(fiveDayForecast);
    for (let i = 0; i < fiveDayForecast.list.length; i += 8) {
      //   created html elements to append to
      var cardDiv = $("<div>");
      cardDiv.attr("class", "card");
      var listUl = $("<ul>");

      // info form forcast to create li out of
      var day = fiveDayForecast.list[i].dt_txt;
      var dayTemp = Math.ceil(fiveDayForecast.list[i].main.temp);
      var dayHum = fiveDayForecast.list[i].main.humidity;
      var dayWindSpd = Math.ceil(fiveDayForecast.list[i].wind.speed);

      // creating li items & append
      var dayLI = $("<h3>");
      dayLI.text(day.slice(0, 10));
      listUl.append(dayLI);

      var tempLI = $("<li>");
      tempLI.text("Temp: " + dayTemp + "C");
      listUl.append(tempLI);

      var humLI = $("<li>");
      humLI.text("Humidity: " + dayHum);
      listUl.append(humLI);

      var windLI = $("<li>");
      windLI.text("Wind Speed: " + dayWindSpd + " KPH");
      listUl.append(windLI);

      // append ul to div and div to html
      cardDiv.append(listUl);
      $("#five-day-forecast").append(cardDiv);
    }
    $("#City").empty().val("");
  });
});

// clear button

$("#clear").click(function () {
  event.preventDefault();
  $("#history").empty();
});
