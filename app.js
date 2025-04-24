let isCelsius = true;
let apiKey = "2da1e54d97209acb6696623d0a65fa9e";

// Function to get weather for current location
function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  let img = document.getElementById("random");
  let humidity = document.getElementById("humidity");
  let windSpeed = document.getElementById("wind-speed");

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let units = isCelsius ? "metric" : "imperial";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    fetchWeather(url);
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location.";
  }
}

// Function to fetch weather data and display it
function fetchWeather(url) {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  let img = document.getElementById("random");
  let humidity = document.getElementById("humidity");
  let windSpeed = document.getElementById("wind-speed");

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let temp = data.main.temp;
      temperature.innerHTML = isCelsius ? `${temp}° C` : `${temp}° F`;

      location.innerHTML = `${data.name}`;
      description.innerHTML = data.weather[0].main; // This will show "Clear", "Clouds", "Rain", etc.
      humidity.innerHTML = data.main.humidity;
      windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h

      // Get the weather condition and update the icon and background based on it
      let weatherMain = data.weather[0].main;
      img.src = getWeatherConditionIcon(weatherMain);
      document.body.style.backgroundImage = getWeatherConditionBackground(weatherMain); // Set the background
    })
    .catch(() => {
      location.innerHTML = "Unable to fetch weather data.";
    });
}

// Function to get weather icon based on weather condition
function getWeatherConditionIcon(weather) {
  if (weather.toLowerCase().includes("clear")) {
    return "img/sun.png";
  } else if (weather.toLowerCase().includes("cloud")) {
    return "img/clouds.png";
  } else if (weather.toLowerCase().includes("rain")) {
    return "img/rainy.png";
  } else if (weather.toLowerCase().includes("thunderstorm")) {
    return "img/thunderstorm.png";
  } else if (weather.toLowerCase().includes("snow")) {
    return "img/snow.png";
  } else if (weather.toLowerCase().includes("haze")) {
    return "img/haze.png"; // Icon for haze condition
  } else {
    return "img/default.png"; // Default icon for other conditions
  }
}

// Function to get background based on weather condition
function getWeatherConditionBackground(weather) {
  if (weather.toLowerCase().includes("clear")) {
    return "url('img/clear-bg.jpg')";
  } else if (weather.toLowerCase().includes("clouds")) {
    return "url('img/cloudy-bg.jpg')";
  } else if (weather.toLowerCase().includes("rain")) {
    return "url('img/rainy-bg.jpg')";
  } else if (weather.toLowerCase().includes("thunderstorm")) {
    return "url('img/thunderstorm-bg.jpg')";
  } else if (weather.toLowerCase().includes("snow")) {
    return "url('img/snow-bg.jpg')";
  } else if (weather.toLowerCase().includes("Haze")) {
    return "url('img/haze-bg.jpg')";
  } else {
    return "url('img/default-bg.jpg')"; // Default background for other conditions
  }
}

// Search weather by city name
function searchCityWeather() {
  let city = document.getElementById("city-input").value;
  if (city.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  let units = isCelsius ? "metric" : "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  fetchWeather(url);
}

// Event listener for search button
document.getElementById("city-search-btn").addEventListener("click", searchCityWeather);

// Toggle between Celsius and Fahrenheit
document.getElementById("unit-toggle").addEventListener("click", () => {
  isCelsius = !isCelsius;
  document.getElementById("unit-toggle").innerHTML = isCelsius ? "Switch to °F" : "Switch to °C";
  getWeather(); // Refresh weather with the new unit
});

// Refresh weather data
document.getElementById("refresh-btn").addEventListener("click", getWeather);

// Initial call to get weather for current location
getWeather();
