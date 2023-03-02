import axios from 'axios'

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = process.env.REACT_APP_OPEN_WEATHER_KEY

const getCapitalWeather = (capitalName) => {
    const request = axios.get(`${url}q=${capitalName}&units=metric&appid=${apiKey}`)
    return request.then(response=>response.data)
}

export default getCapitalWeather