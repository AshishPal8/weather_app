function updateTime() {
  const currentTimeElement = document.getElementById("current-time");
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  currentTimeElement.textContent = timeString;
}
setInterval(updateTime, 1000);

const API_KEY = "fc7a9a52d98a8484bda3a9366b28bc86";

const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const searchCity = async () => {
  const city = document.getElementById("city-input").value;
  console.log(city);
  const data = await getWeatherData(city);
  showWeatherData(data);
};

const showWeatherData = (weatherData) => {
  const tempFahrenheit = weatherData.main.temp;
  const feelLikeFahrenhiet = weatherData.main.feels_like;
  const tempCelsius = (tempFahrenheit - 32) * (5 / 9);
  const feelLikeCelcius = (feelLikeFahrenhiet - 32) * (5 / 9);
  const cityName = (document.getElementById("city-name").innerText =
    weatherData.name);
  const weatherType = (document.getElementById("weather-type").innerText =
    weatherData.weather[0].main);
  const weatherDesc = (document.getElementById("desc").innerText =
    weatherData.weather[0].description);
  const temp = (document.getElementById(
    "temp"
  ).innerText = `${tempCelsius.toFixed(2)}°C`);
  const wind = (document.getElementById(
    "wind"
  ).innerText = `${weatherData.wind.speed}mph`);
  const humidity = (document.getElementById(
    "humidity"
  ).innerText = `${weatherData.main.humidity}%`);
  const feelLike = (document.getElementById(
    "feel-like"
  ).innerText = `${feelLikeCelcius.toFixed(2)}°C`);
  const pressure = (document.getElementById("pressure").innerText =
    weatherData.main.pressure);

  const sunriseTimestamp = weatherData.sys.sunrise * 1000;
  const sunsetTimestamp = weatherData.sys.sunset * 1000;

  const sunriseDate = new Date(sunriseTimestamp);
  const sunsetDate = new Date(sunsetTimestamp);

  const sunriseTimeString = sunriseDate.toLocaleTimeString();
  const sunsetTimeString = sunsetDate.toLocaleTimeString();

  const sunrise = (document.getElementById("sunrise-time").innerText =
    sunriseTimeString);
  const sunset = (document.getElementById("sunset-time").innerText =
    sunsetTimeString);

  // dynamic image
  const weatherImage = document.getElementById("weather-image");
  let imageUrl;
  switch (weatherType) {
    case "Clouds":
      imageUrl = "img/sunrise.png";
      break;
    case "Clear":
      imageUrl = "img/sunny1.png";
      break;
    case "Atmosphere":
      imageUrl = "clear.jpg";
      break;
    case "Snow":
      imageUrl = "img/snow.png";
      break;
    case "Rain":
      imageUrl = "img/rain.png";
      break;
    case "Drizzle":
      imageUrl = "img/drizzle1.png";
      break;
    case "Thunderstorm":
      imageUrl = "img/stormy1.png";
      break;
    default:
      imageUrl = "img/sunrise.png";
      break;
  }
  weatherImage.src = imageUrl;
};
