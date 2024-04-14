import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoord] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const success=(position)=>{
   const obj={
    lat:position.coords.latitude,
    long:position.coords.longitude
   }
   setCoord(obj);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  useEffect(() => {
  const APIKey="5c701d78d655372d936c705fee797b95"
    if(coords)
    {
      const url=`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${APIKey}`
      axios.get(url)
        .then(res=> {
        const temperatura={
          celcius: (res.data.main.temp-273.15).toFixed(2),
          min: (res.data.main.temp_min-273.15).toFixed(2),
          max: (res.data.main.temp_max-273.15).toFixed(2),
          feels_like: (res.data.main.feels_like-273.15).toFixed(2),
        }
        setTemp(temperatura)
        setWeather(res.data)})
        .catch(err=> console.log(err))
    }
    
  }, [coords])
  
  console.log(temp)
  console.log(weather)

  return (
    <>
     <div className='main_component'>
     <h1>Wheater app</h1>
     <WeatherCard
     weather={weather}
     temp={temp}/>
     </div>
    </>
  )
}

export default App
