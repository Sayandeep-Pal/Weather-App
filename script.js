const container = document.querySelector(".container");
const error404 = document.querySelector(".not-found");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const cityHide = document.querySelector(".city-hide");




document.getElementById("get-weather").addEventListener("click", fetchWeather);

function fetchWeather() {
  const city = document.getElementById("city-input").value;
  const apiKey = "API_KEY"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(data) {
  if (data.cod === "404") {
    //cityHide.textContent= city;
    container.style.height = "400px";
    weatherBox.classList.remove("active");
    weatherDetails.classList.remove("active");
    error404.classList.add("active");
    return;
  }
  
    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature");
    const description = document.querySelector(".weather-box .description");
    const humidity = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");
  
    console.log(data);
    const temp = parseInt(data.main.temp);
    const feelsLike = data.main.feels_like;
    const weather = data.weather[0].description;
    const city = data.name;
    //const country = data.sys.country;
    const windSpeed = data.wind.speed;

    if(cityHide.textContent == city){
      return;
    }
    else{
      cityHide.textContent= city;

      container.style.height = "555px";
      container.classList.add("active");
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      setTimeout(() => {
        container.classList.remove("active");
      }, 2500);

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Thunderstorm":
          image.src = "images/rain.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;

        default:
          image.src = "";
      }
      temperature.innerHTML = 
      `${temp}<span>°C</span><br>
      <span>feels like ${feelsLike}°C</span>`;
      description.innerHTML = `<br>${weather}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${windSpeed}km/h`;
      
      const infoHumidity = document.querySelector(".info-humidity");
      const infoWind = document.querySelector(".info-wind");
      const infoWeather = document.querySelector(".info-weather");

      const elCloneInfoWeather = infoWeather.cloneNode(true);
      const elCloneInfoHumidity = infoHumidity.cloneNode(true);
      const elCloneInfoWind = infoWind.cloneNode(true);

      elCloneInfoWeather.id ='clone-info-weather';
      elCloneInfoWeather.classList.add('active-clone');

      elCloneInfoHumidity.id ='clone-info-humidity';
      elCloneInfoHumidity.classList.add('active-clone');  

      elCloneInfoWind.id ='clone-info-wind';  
      elCloneInfoWind.classList.add('active-clone');

      setTimeout(() => {
        infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
        infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
        infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
      }, 2200);

      const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
      const totalCloneInfoWeather = cloneInfoWeather.length;
      const cloneInfoWeatherFirst = cloneInfoWeather[0];

      const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
      const cloneInfoHumidityFirst = cloneInfoHumidity[0];

      const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
      const cloneInfoWindFirst = cloneInfoWind[0];

      if(totalCloneInfoWeather > 0){
        cloneInfoWeatherFirst.classList.remove('active-clone');
        cloneInfoHumidityFirst.classList.remove('active-clone');
        cloneInfoWindFirst.classList.remove('active-clone');

        setTimeout(() => {
          cloneInfoWeatherFirst.remove();
          cloneInfoHumidityFirst.remove();
          cloneInfoWindFirst.remove();
        }, 2200);
      }
    }
    
  
}
