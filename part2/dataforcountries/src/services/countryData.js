import axios from 'axios'

const url='https://restcountries.com/v3.1'

const getByName = (name) => {
    const request = axios.get(`${url}/name/${name}?fields=name,capital,area,languages,flags`)
    return request.then(response=>response.data.map(
        (country, index)=>{
            return {...country, id: index}
        }
    ))
}

export default getByName