import { useState, useEffect } from 'react'
import Phonebook from './Phonebook'
import SearchFilter from './SearchFilter'
import EntryForm from './EntryForm'
import entryServices from '../services/entries'
import Notification from './Notifications'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect (() => {
    entryServices
      .getEntries()
      .then((data)=>setPersons(data))
    }
    ,[])

  const addEntry = (event) => {
    event.preventDefault()
    const match = persons.find(person=>person.name === newName)
    if (match !== undefined) {
      if (window.confirm(`${match.name} is already added to the phonebook, replace the old number with a new one?`)) {
        entryServices.updateEntry({...match, number:newNumber})
        .then((data)=> {
          console.log(data)
          setPersons(persons.map(p => p.id === data.id ? data:p))
          setSuccessMsg(`Added ${match.name}`)
          setTimeout(() => setSuccessMsg(null), 5000)
        })
        .catch((error)=>{
          console.log(`Update entry error description: ${error}`)
          setErrorMsg(`Information about ${match.name} has already been removed from server.`)
          setTimeout(() => setErrorMsg(null), 5000)
          setPersons(persons.filter((p)=>p.id !== match.id))
        })
        
      }
    } 
    else {
      entryServices.addEntry({name: newName, number: newNumber})
        .then(
          (newPerson) => {
            console.log(newPerson)
            setSuccessMsg(`Added ${newPerson.name}`)
            setTimeout(() => setSuccessMsg(null), 5000)
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
        .catch(
          (error) => {
            let msg = ``
            console.log(`New entry error description: ${error}`)
            if (error.request.response.includes('VALIDATION_ERROR_NUMBER')){
              msg =`The format of the number is incorrect.\n
              It must contain two number separated by a dash.\n
              The first number must be 2 or 3 characters long.\n
              The total number of characters must be larger than 8.\n 
              Example: 123-45678`
            } else if (error.request.response.includes('VALIDATION_ERROR_NAME')) {
              msg = `The format of the name is incorrect.\n
              It must be at least 3 characters long.`
            } else { msg = error.message }
            setErrorMsg(msg)
            setTimeout(() => setErrorMsg(null), 5000)
          });
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const target = persons.find((person) => person.id === id)
    console.log(id)
    if (window.confirm(`Do you wish to delete ${target.name}?`)) {
      entryServices
        .removeEntry(id)
        .catch(error => {
          console.log(`Delete error description: ${error}`)
          setErrorMsg(`Information about ${target.name} has already been removed from server.`)
          setTimeout(() => setErrorMsg(null), 5000)
        })
        setPersons(persons.filter((p)=>p.id !== id))
    }
  }
  
  const getFilteredEntries = () => persons.filter(element=>element.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification.SuccessNotification msg={successMsg}/>
      <Notification.ErrorNotification msg={errorMsg}/>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <EntryForm newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addEntry={addEntry}/>
      <h2>Numbers</h2>
      <Phonebook entryList={getFilteredEntries()} handleDelete={handleDelete}/>
    </div>
  )
}

export default App