console.log("this is linked");
var currentCity = $(".current-city");

var apiKey = "676649a33e95382fb9220015cd3bcce8";
var city = "Bellingham";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=bellingham&appid=" +
  apiKey +
  "&units=metric";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  var currentCityHead = $("<h2>");
  currentCityHead.text(city);
  currentCity.prepend(currentCityHead);

  var temp = $("<h2>");
  temp.text(" Tempature: " + Math.ceil(response.main.temp) + " Celcius");
  $(".temp").append(temp);

  var humid = $("<h2>");
  humid.text("Humidty: " + response.main.humidity + "%");
  $(".humidity").append(humid);

  var windSpeed = $("<h2>");
  windSpeed.text("Wind Speed: " + response.wind.speed + " KPH");
  $(".wind-speed").append(windSpeed);
});
