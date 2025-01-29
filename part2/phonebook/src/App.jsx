import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownNumber, setShownNumber] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if(event.target.value === '') {
      setShownNumber(persons)
    } else {
      setShownNumber(persons.filter(x => x.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find(x => {
      return x.name.toLocaleLowerCase() === newName.toLocaleLowerCase() ? true : false
    }) 
    console.log(found)
    if ( found ) {
      return alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={ filter } onChange={ handleFilterChange } />
        </div>
      </form>
      <h2>Add a New</h2>
      <form onSubmit={ addPerson }>
        <div>
          name: <input value={ newName } onChange={ handleNameChange } />
        </div>
        <div>
          number: <input value={ newNumber } onChange={ handleNumberChange } />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        shownNumber.map(x => <p key={x.name}>{x.name} {x.number}</p>)
      }
    </div>
  )
}

export default App