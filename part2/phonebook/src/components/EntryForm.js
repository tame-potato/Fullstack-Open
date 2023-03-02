const EntryForm = ({newName, newNumber, addEntry, handleNewName, handleNewNumber}) => {
    return (
      <form onSubmit={addEntry}>
        <div>
          <li>name: <input value={newName} onChange={handleNewName}/></li>
          <li>number: <input value={newNumber} onChange={handleNewNumber}/></li>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default EntryForm