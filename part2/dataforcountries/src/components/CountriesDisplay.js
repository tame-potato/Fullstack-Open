import getCapitalWeather from "../services/capitalWeather"
import {useState, useEffect} from 'react'

const ListLanguages = ({languages}) => {
    return Object.entries(languages).map(
        ([key, value], index) => {
        return (
            <li key={key}>{value}</li>
        )
    })
}

const CountryDetails = ({country, handler}) => {
    const capitals = country.capital.reduce((accum, curr)=>accum+','+curr)
    const [weather, setWeather] = useState(undefined)
    const flagStyle = { width: '300px' }
    const weatherStyle = { width: '150px' }

    useEffect(
        () => {
            getCapitalWeather(country.capital[0]).then(data=>setWeather(data))
        }, []
    )

    return (
        <div>
            <h1>{country.name.common}</h1>
            <button onClick={handler}>Back</button>
            <li>capital: {capitals}</li>
            <li>area: {country.area} sq km</li>
            <h2>languages</h2>
            <ul>
                <ListLanguages languages={country.languages}/>
            </ul>
            <img src={country.flags.png} alt={`${country.name.common} flag`} style={flagStyle}/>
            <h1>Weather in {country.capital[0]}</h1>
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
            <CountryDetails country={countries[singleId]} handler={handleBack}/>
        )
    } else {
        return (
            <div>
                {countries ? countries.map((country)=><Country key={country.id} country={country} handler={handleShow}/>) : null}
            </div>
        )
    }

}

export default CountriesDisplay