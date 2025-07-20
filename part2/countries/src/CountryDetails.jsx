const CountryDetails = (props) => {
    const iconUrl = props.weatherDetails ? 'https://openweathermap.org/img/wn/' + props.weatherDetails.weather[0].icon + '@2x.png' : ''
    return (
        <div>
            <h1>
                {props.commonName}
            </h1>
            <p>
                Capital {props.capital} <br />
                Area {props.area}
            </p>
            <h2>
                Languages
            </h2>
            <ul>
                {
                    props.languages ? props.languages.map(x => <li key={x}>{x}</li>) : ''
                }
            </ul>
            <img style={{ height: '200px' }} src={props.flag} />
            {
                props.weatherDetails ? (
                    <>
                        <h2>
                            Weather in {props.capital}
                        </h2>
                        <p>
                            Temperature {props.weatherDetails.main.temp - 273.15} Celcius
                        </p>
                        <img src={iconUrl} />
                        <p>
                            Wind {props.weatherDetails.wind.speed} m/s
                        </p>
                    </>
                ) : ''
            }
        </div>
    )
}

export default CountryDetails