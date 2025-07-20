import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import CountryDetails from './CountryDetails'

const App = () => {
  const [countriesList, setCountriesList] = useState(null)
  const [display, setDisplay] = useState(null)
  const [countryLanguages, setCountryLanguages] = useState(null)
  const [filterString, setFilterString] = useState('')
  const [weather, setWeather] = useState(null)

  const getCountries = (event) => {
    setFilterString(event.target.value)

    if (event.target.value != '' && countriesList && event.target.value != filterString) {
      setFilterString(event.target.value)
      setDisplay(countriesList.filter((item) => item.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }
  }

  useEffect(() => {
    countryService.getAll()
      .then(list => {
        setCountriesList(list)
      })

    if (display && display.length === 1) {
      countryService.getCountry(display[0].name.common)
        .then(result => {
          const langArray = (Object.values(result.languages))
          setCountryLanguages(langArray)
        })
      weatherService.getWeather([display[0].capitalInfo.latlng[0], display[0].capitalInfo.latlng[1]])
        .then(res => {
          setWeather(res)
        })
    }
  }, [display])

  const showCountry = (countryData) => {
    setDisplay([countryData])
  }

  return (
    <div>
      find countries {" "}
      <input type='text' onChange={getCountries} />
      {
        display ? (
          display.length > 10 ?
            (
              <p>
                Too many matches, specify another filter
              </p>
            ) : (
              display.length > 1 ? (
                display.map(x => {
                  return <p key={x.name.common}>{x.name.common} <button onClick={() => showCountry(x)}>Show</button></p>
                })
              ) : (
                <CountryDetails weatherDetails={weather} commonName={display[0].name.common} capital={display[0].capital} area={display[0].area} languages={countryLanguages} flag={display[0].flags.svg} />
              )
            )
        ) : ''
      }
    </div >
  )
}

export default App
