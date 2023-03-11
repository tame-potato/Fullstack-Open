
const PhonebookEntry = ({person, handleDelete}) => {
  return (
    <li>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>    
    </li>
  )
}

const Phonebook = ({entryList, handleDelete}) => {
  return (
    <div>{entryList.map(person=><PhonebookEntry key={person.id} person={person} handleDelete={handleDelete}/>)}</div>
  )

}

export default Phonebook