const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

const processWeatherData = function (data) {
  const processedWeather = {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    wind: Math.round(data.wind.speed),
    humidity: data.main.humidity,
    description: data.weather[0].description,
    imgUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
  return processedWeather;
};

const displayData = function (data) {
  const cityH2 = document.querySelector('.city-h2');
  const temp = document.querySelector('.temp');
  const feelsLike = document.querySelector('.feels');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const weatherIcon = document.querySelector('.weather-icon');

  cityH2.textContent = `${data.city}, ${data.country}`;
  temp.textContent = `${data.temp}°C`;
  feelsLike.textContent = `Feels like: ${data.feelsLike}°C`;
  wind.textContent = `Wind: ${data.wind}km/h`;
  humidity.textContent = `Humidity: ${data.humidity}%`;
  weatherIcon.src = data.imgUrl;
};

async function getWeather(city) {
  try {
    const weatherResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=d9523b5c914cab4b5f04bd6fa0ad108a`,
      { mode: 'cors' }
    );

    const weatherData = await weatherResponse.json();
    const processedWeather = processWeatherData(weatherData);
    displayData(processedWeather);
  } catch (error) {
    console.error(error);
  }
}
searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  getWeather(city);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value;
    getWeather(city);
  }
});

getWeather('Buenos Aires');
