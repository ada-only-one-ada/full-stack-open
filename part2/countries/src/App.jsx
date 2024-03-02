import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('');
  const [infos, setInfos] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

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
      // filter 国家列表
      const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()));
      setFilteredCountries(filteredCountries);

      // 找到了确切的国家
      if (filteredCountries.length === 1) {
        setInfos(filteredCountries[0]);
        setFilteredCountries([]);
        //没有找到确切的国家，列出filter的国家
      } else {
        setInfos({});
      }

      // 如果input value为空
    } else {
      setInfos({});
      setFilteredCountries([]);
    }
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div>
      <Filter value={value} handleChange={handleChange} />
      <CountryList filteredCountries={filteredCountries} />
      <CountryInfo infos={infos} />
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

const CountryList = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  return (
    <ul>{filteredCountries.map(country =>
      (<li key={country.name.common}>{country.name.common}</li>))}
    </ul>
  )
}

const CountryInfo = ({ infos }) => {
  if (!infos.name) {
    return null;
  }

  const languages = Object.values(infos.languages);
  return (
    <div>
      <h1>{infos.name.common}</h1>

      <p>capital {infos.capital}</p>
      <p>area {infos.area} </p>

      <h2>languages: </h2>
      <ul>{languages.map((language, index) => (
        <li key={index}>{language}</li>))}
      </ul>

      <img src={infos.flags.png} alt={`Flag of ${infos.name.common}`} style={{ width: '150px' }} />
    </div>
  );
};


export default App