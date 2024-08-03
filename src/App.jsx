import { useState } from 'react'
import './App.css'

function App() {
  const constInitialText = 'Enter city name to check weather'
  const API_KEY = 'ac031c67f89e43c190e8474cc99314ae'
  
  const [initialText, setInitialText] = useState(constInitialText)
  const [iconUrl, setIconUrl] = useState('')
  const [cityName, setCityName] = useState('')
  const [currTemp, setCurrTemp] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [minTemp, setMinTemp] = useState('')
  const [maxTemp, setMaxTemp] = useState('')
  const [country, setCountry] = useState('')
  var city = ''
  

  const resetToDefault = () => {
    setIconUrl('')
    // setCityName('')
    city = ''
    setCurrTemp('')
    setFeelsLike('')
    setMinTemp('')
    setMaxTemp('')
    setCountry('')
  }

  const fetchingMsg = () => {
    return 'Fetching Weather...for city \''+city+'\''
  }

  const default_bg = {
    backgroundImage: 'url("./main-bg.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  }

  const getWeather = () => {
    resetToDefault()
    city = cityName.toString()
    setInitialText(fetchingMsg())
    
    console.log(city)
    if (!city) {
      setInitialText(constInitialText)
      alert('Please enter a valid city name!')
      return
    }

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    fetch(weatherURL)
      .then(res => res.json())
      .then(data => displayWeather(data))
      .catch(err => {
        alert('Cannot fetch API. Please try again!')
        console.log(err)
        setInitialText(constInitialText)
        setCityName('')
      })
  }

  const displayWeather = (data) => {
    console.log(data)
    city = data.name
    setCountry(data.sys.country)
    setInitialText(`${city}, ${country}`)
    // console.log(data.weather[0])
    const iconCode = data.weather[0].icon;
    setIconUrl(`https://openweathermap.org/img/wn/${iconCode}@4x.png`)
    setCurrTemp(`${Math.round(data.main.temp-273)}\u00B0C`)
    setFeelsLike(`Feels Like: ${Math.round(data.main.feels_like-273)}\u00B0C`)
    setMinTemp(`Minimum: ${Math.round(data.main.temp_min-273)}\u00B0C`)
    setMaxTemp(`Maximum: ${Math.round(data.main.temp_max-273)}\u00B0C`)
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center' style={default_bg}>
      <div className="flex justify-center w-full">
        <div className="flex-col justify-center bg-white bg-opacity-75 w-1/2 p-10 rounded-md border-4 border-orange-600" style={{maxWidth: '600px', minWidth: '400px'}}>
          <h1 className='text-center text-xl'>{initialText}</h1>
          <div className="flex flex-col flex-wrap justify-center gap-2 p-4 w-full" style={{alignSelf: 'center'}}>
            <div className="flex flex-wrap justify-center">
              <img src={iconUrl} alt="" width='300rem' />
              <div className="flex flex-col justify-center mb-2">
                <div className="text-6xl font-bold">{currTemp}</div>
                <div className="text-md mb-8">{feelsLike}</div>
                <div className="text-xl">{minTemp}</div>
                <div className="text-xl">{maxTemp}</div>
              </div>
            </div>
            <input type="text" value={cityName} onChange={event => setCityName(event.target.value)} className='text-xl p-1 border-2 border-black w-3/5 rounded-md mb-2' style={{alignSelf: 'center'}} />
            <input type="button" value='Submit' className='text-xl py-1 px-4 rounded-md cursor-pointer border-2 w-fit border-black bg-blue-800 text-white' onClick={getWeather} style={{alignSelf: 'center'}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
