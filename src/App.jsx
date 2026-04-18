import { useEffect, useState } from "react";
import "./App.css";

const weatherImages = {
  Clear: `${import.meta.env.BASE_URL}sunny.png`,
  Clouds: `${import.meta.env.BASE_URL}cloudy.png`,
  Rain: `${import.meta.env.BASE_URL}rainy.png`,
  Snow: `${import.meta.env.BASE_URL}snowy.png`,
  Thunderstorm: `${import.meta.env.BASE_URL}thunderstorm.png`,
  Drizzle: `${import.meta.env.BASE_URL}drizzle.png`,
  Mist: `${import.meta.env.BASE_URL}mist.png`,
  Smoke: `${import.meta.env.BASE_URL}smoke.png`,
};

const defaultImage = `${import.meta.env.BASE_URL}weather-default.png`;

function App() {
  const [cityName, setCityName] = useState("Peshawar");
  const [weatherData, setWeatherData] = useState(null);

  const date = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const formatedDate = `${months[date.getMonth()]} ${date.getDate()} , ${date.getFullYear()}`;

  const API_KEY = "f17df4e9da494efc94e8321d20af4a51";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const inputHandler = (e) => {
    setCityName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getWeatherImage = (condition) => {
    return weatherImages[condition] || defaultImage;
  };

  return (
    <>
      <div className="page-background">

        <div className="title-container">
  <h1 className="app-title">SkyCast</h1>
  <p className="app-slogan">Your daily weather, at a glance.</p>
</div>
        <div className="container">
          {weatherData && (
            <>
              <div className="weather-card">
                <div className="card-header">
                  <p className="date-text">{formatedDate}</p>
                  <h2 className="city-name">{weatherData.name}</h2>
                </div>

                <div className="weather-image-wrapper">
                  <img
                    src={getWeatherImage(weatherData.weather[0].main)}
                    alt={`${weatherData.weather[0].main} weather`}
                    className="weather-image"
                  />
                </div>

                <div className="weather-info">
                  <h1 className="temperature">{weatherData.main.temp}°C</h1>
                  <h3 className="condition">{weatherData.weather[0].main}</h3>
                </div>

                <form className="search-form" onSubmit={submitHandler}>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Enter City Name"
                      onChange={inputHandler}
                      className="city-input"
                    />
                    <button type="submit" className="search-btn">Search</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;