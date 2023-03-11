import axios from 'axios'

const url = '/api/phonebook'

const getEntries = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addEntry = (newObject) => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const updateEntry = (newPerson) => {
    const request = axios.put(`${url}/${newPerson.id}`, newPerson)
    return request.then(response =>  response.data)
}

const removeEntry = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then((response) => response.data)
}

export default {
    getEntries,
    addEntry,
    updateEntry,
    removeEntry
}