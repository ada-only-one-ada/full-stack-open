import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // Skip if currency is not defined
    // Or when the currency gets a new value, the application fetches its exchange rates from the API in the effect function:
    if (currency) { // this prevents requesting the exchange rates just after the first render when the variable currency still has the initial value, i.e. a null value.
      console.log('fetching exchange rates...');
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`) // https://open.er-api.com/v6/latest/eur 
        .then(response => {
          setRates(response.data.rates); // stores the response in the rates state
        })
    }
  }, [currency]) // The useEffect hook now has [currency] as the second parameter. 
  // The effect function is therefore executed after the first render,
  // and always after the table as its second parameter [currency] changes.
  // That is, when the state currency gets a new value, the content of the table changes and the effect function is executed.

  // The application takes the input as value when user is typing 
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  // The application sets the name of the currency entered to the form to the state currency at the moment the button is pressed.
  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  /* without using the useEffect, but this is not always working. useEffect can provide a solution.
    const onSearch = (event) => {
    event.preventDefault()
    axios
      .get(`https://open.er-api.com/v6/latest/${value}`)
      .then(response => {
        setRates(response.data.rates)
      })
  }
  */

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}

export default App