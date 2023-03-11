import {useState} from 'react'
import countryAPI from './services/countryData'
import SearchForm from './components/SearchForm'
import CountriesDisplay from './components/CountriesDisplay'
import Notifications from './components/Notifications'

function App() {
  const [newName, setNewName] = useState('')
  const [countries, setCountries] = useState([])
  const [singleCountry, setSingleCountry] = useState(null)
  const [errorMsg, setError] = useState(null)
  
  const handlerChange = (event) => {
    const newSearch = event.target.value 
    if (newSearch !== '') {
      countryAPI.searchCountriesByName(newSearch)
      .then(
        newCountries=>{
          setCountries(newCountries)
          setError(null)
        }
      )
      .catch(
        (error)=> {
          setError(`There are no matches for '${newSearch}'`)
          setCountries([])
        }
      )
    } else {
      setCountries([])
    }
    setNewName(newSearch)
    setSingleCountry(null)
  }

  const handlerClickShow = (id) => {
    setSingleCountry(id)
  }

  const handlerClickBack = (event) => {
    setSingleCountry(null)
  }

  return (
    <div>
      <SearchForm value={newName} handlerChange={handlerChange}/>
      {errorMsg ? <Notifications.ErrorNotification msg={errorMsg}/> : null}
      <CountriesDisplay singleId={singleCountry} countries={countries} handleShow={handlerClickShow} handleBack={handlerClickBack}/>
    </div>    
  );
}

export default App;
