import axios from 'axios'

const url='https://restcountries.com/v3.1'

const searchCountriesByName = (name) => {
    const request = axios.get(`${url}/name/${name}?fields=name,cca2`)
    return request.then(response=>response.data.map(
        (country, index)=>{
            return {...country, id: index}
        }
    ))
}

const getDetailsByCCA2 = (cca2) => {
    const request = axios.get(`${url}/alpha/${cca2}?fields=name,capital,area,languages,flags`)
    return request.then(response=>response.data)
}

export default {
    searchCountriesByName,
    getDetailsByCCA2
}