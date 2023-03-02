import {useState} from 'react'
import getByname from './services/countryData'
import SearchForm from './components/SearchForm'
import CountriesDisplay from './components/CountriesDisplay'

function App() {
  const [newName, setNewName] = useState('')
  const [countries, setCountries] = useState(null)
  const [singleCountry, setSingleCountry] = useState(null)
  
  const handlerChange = (event) => {
    const newSearch = event.target.value 
    if (newSearch !== '') {
      getByname(newSearch).then(newCountries=>setCountries(newCountries))
    } else {
      setCountries(null)
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
      <CountriesDisplay singleId={singleCountry} countries={countries} handleShow={handlerClickShow} handleBack={handlerClickBack}/>
    </div>    
  );
}

export default App;
