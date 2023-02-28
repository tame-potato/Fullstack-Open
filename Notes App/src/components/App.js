import { useState, useEffect } from 'react'
import Note from './Note'
import noteService from '../services/notes'
import Notification from './Notification'
import Footer from './Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService      
      .getAll()      
      .then(response => {        
        setNotes(response)      
    })  
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService      
      .update(id, changedNote)      
      .then(response => {        
        setNotes(notes.map(note => note.id !== id ? note : response))      
    })
     .catch(error => {      
        setErrorMessage(          
          `Note '${note.content}' was already removed from server`        
          )        
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
        })
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    noteService      
      .create(noteObject)      
      .then(response => {        
        setNotes(notes.concat(response))        
        setNewNote('')      
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleShowAllClick = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
             />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'> save </button>
      </form>
      <button onClick={handleShowAllClick}>{showAll ? 'Show Important Only' : 'Show All'}</button>
      <Footer/>
    </div>
  )
}

export default App
