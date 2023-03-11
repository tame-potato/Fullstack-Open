import getCapitalWeather from '../services/capitalWeather'
import countryAPI from '../services/countryData'
import {useState, useEffect} from 'react'

const ListLanguages = ({languages}) => {
    return Object.entries(languages).map(
        ([key, value], index) => {
        return (
            <li key={key}>{value}</li>
        )
    })
}

const CountryDetails = ({country}) => {
    const [weather, setWeather] = useState(undefined)
    const [countryDetails, setCountryDetails] = useState(null)
    const flagStyle = { width: '300px' }
    const weatherStyle = { width: '150px' }

    useEffect(
        () => {
            countryAPI.getDetailsByCCA2(country.cca2).then(
                c => {
                    getCapitalWeather(c.capital[0]).then(w=>setWeather(w))
                    setCountryDetails(c)
                }
            )
        }, []
    )

    return (
        <div>
            <h1>{country.name.common}</h1>
            <li>capital: {countryDetails ? countryDetails.capital[0] : null}</li>
            <li>area: {countryDetails ? countryDetails.area : null} sq km</li>
            <h2>languages</h2>
            <ul>
                {countryDetails ? <ListLanguages languages={countryDetails.languages}/> : null}
            </ul>
            {countryDetails ? <img src={countryDetails.flags.png} alt={`${countryDetails.name.common} flag`} style={flagStyle}/> : null}
            <h1>Weather in {countryDetails ? countryDetails.capital[0] : null}</h1>
            <li>temperature: {weather ? weather.main.temp : null} Celcius</li>
            {weather ? <img alt='' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} style={weatherStyle}/> : null}
            <li>wind: {weather ? weather.wind.speed : null} m/s</li>
        </div>
    )
}

const Country = ({country, handler}) => {
    const buttonStyle = {
        padding: '1px 1px',
        fontSize: 10
    }
    return (
        <li>
            {country.name.common}
            <button style={buttonStyle} onClick={()=>handler(country.id)}>Show</button>
        </li>
    )
}

const CountriesDisplay = ({singleId, countries, handleShow, handleBack}) => {
    if (singleId !== null) {
        return (
            <div>
            <CountryDetails country={countries[singleId]}/>
            <button onClick={handleBack}>Back</button>
            </div>
        )
    } 
    else if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]} handler={handleBack}/>
        )
    }
    else if (countries.length > 10) {
        return (<li>Too many matches, specify another filter</li>)
    }
    else {
        return (
            <div>
                {countries.map((country)=><Country key={country.id} country={country} handler={handleShow}/>)}
            </div>
        )
    }

}

export default CountriesDisplay