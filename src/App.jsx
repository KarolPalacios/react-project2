import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [weather, setWeather] = useState({})

  const [isCelsius, setIsCelsius] = useState(true)



  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6a40ab262bfc27a456594e60fdf417cf`)
        .then(res => setWeather(res.data))
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(weather);

  return (
    <div className="App">
      <div className="card">
        <h1>Weather App</h1>
        <h3>{weather.name}, {weather.sys?.country}</h3>
        
        <div className="weather">
        <div className="temp">
        <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <p>
          {isCelsius ? (weather.main?.temp-273.15).toFixed(2) : ((weather.main?.temp-273.15)*1.8+32).toFixed(2)} 
          {isCelsius ? "°C" : "°F"}
        </p>
        </div>
        <div className="details">
          <h3>{weather.weather?.[0].description}</h3>

            <p>
              <i className="fa-solid fa-wind"></i> Wind speed {weather.wind?.speed}m/s 
            </p>
            <p>
            <i className="fa-solid fa-cloud"></i> Clouds {weather.clouds?.all}%
            </p>

        </div>
        </div>
        <button onClick={() => setIsCelsius(!isCelsius)}>
          Degress °F/°C
        </button>
      </div>
    </div>
  )
}

export default App
