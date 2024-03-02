import { useState, useEffect } from 'react'
import axios from 'axios'
const myWeatherKey = import.meta.env.VITE_MY_KEY

const App = () => {
  const [value, setValue] = useState('');
  const [infos, setInfos] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState({});

  // 第一次render的时候fetch全部country
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data);
      })
  }, []);

  // 每当input value 改变的时候
  useEffect(() => {
    // 如果input value不为空
    if (value) {
      const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));
      setFilteredCountries(filteredCountries);

      // 找到了确切的国家
      if (filteredCountries.length === 1) {
        setInfos(filteredCountries[0]);
        setFilteredCountries([]);
        console.log(filteredCountries[0].capital);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&appid=${myWeatherKey}`)
          .then(response => {
            setWeather(response.data);
          })

        //没有找到确切的国家，列出filter的国家
      } else {
        setInfos({});
        setWeather({});
      }

      // 如果input value为空
    } else {
      setInfos({});
      setFilteredCountries([]);
      setWeather({});
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <Filter value={value} handleChange={handleChange} />
      <CountryList filteredCountries={filteredCountries} setValue={setValue} />
      <CountryInfo infos={infos} weather={weather} />
    </div>
  );
}

const Filter = ({ value, handleChange }) => {
  return (
    <form>
      <div>find countries <input value={value} onChange={handleChange} /></div>
    </form>
  )
}

const CountryList = ({ filteredCountries, setValue }) => {
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  return (
    <div>{filteredCountries.map(country =>
      <div key={country.name.common}>
        {country.name.common}

        <button onClick={() => setValue(country.name.common)}>show</button>
      </div>)}
    </div>
  )
}

const CountryInfo = ({ infos, weather }) => {
  const countryName = infos.name && infos.name.common;
  const capital = infos.capital;
  const area = infos.area;
  const languages = infos.languages && Object.values(infos.languages);
  const flag = infos.flags && infos.flags.png;

  const iconCode = weather.weather && weather.weather[0].icon;
  const temperatureInKelvin = weather.main && weather.main.temp;
  const temperatureInCelsius = temperatureInKelvin ? (temperatureInKelvin - 273.15).toFixed(2) + " Celcius" : "not found";
  const windSpeed = weather.wind ? weather.wind.speed + " m/s" : "not found";
  const weatherIconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

  if (!countryName) {
    return null;
  }

  return (
    <div>
      <h1>{countryName}</h1>

      <p>capital {capital}</p>
      <p>area {area} </p>

      <h2>languages: </h2>
      <ul>{languages.map((language, index) => (
        <li key={index}>{language}</li>))}
      </ul>

      <img src={flag} alt={`Flag of ${countryName}`} style={{ width: '150px' }} />

      <div>
        <h1>Weather in {capital}</h1>
        <p>temperature {temperatureInCelsius}</p>
        <img src={weatherIconUrl} />
        <p>wind {windSpeed}</p>
      </div>
    </div>
  );
};

export default App