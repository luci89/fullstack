import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App = () => {
  const [countriesList, setCountriesList] = useState(null)
  const [display, setDisplay] = useState(null)
  const [countryLanguages, setCountryLanguages] = useState(null)
  const [filterString, setFilterString] = useState('')

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
      console.log(display)
      countryService.getCountry(display[0].name.common)
        .then(result => {
          const langArray = (Object.values(result.languages))
          setCountryLanguages(langArray)
          console.log(result)
        })
    }
  }, [display])

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
                  return <p key={x.name.common}>{x.name.common}</p>
                })
              ) : (
                <>
                  <h1>
                    {display[0].name.common}
                  </h1>
                  <p>
                    Capital {display[0].capital} <br />
                    Area {display[0].area}
                  </p>
                  <h2>
                    Languages
                  </h2>
                  <ul>
                    {
                      countryLanguages ? countryLanguages.map(x => <li key={x}>{x}</li>) : ''
                    }
                  </ul>
                  <img style={{width: '300px', height: '300px'}} src={display[0].flags.svg} />
                </>
              )
            )
        ) : ''
      }
    </div>
  )
}

export default App
