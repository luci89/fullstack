import { useState, useEffect } from 'react'
import Filter from './Filter'
import AddPerson from './AddPerson'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownNumber, setShownNumber] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShownNumber(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter currentState={filter} updateFilter={setFilter} updateList={setShownNumber} fullList={persons} />
      <h2>Add a New</h2>
      <AddPerson currentName={newName} currentNumber={newNumber} currentList={persons} updateName={setNewName} updateNumber={setNewNumber} updateList={setPersons} updateDisplay={setShownNumber} updateFilter={setFilter} />
      <h2>Numbers</h2>
      <Persons shownList={shownNumber} />
    </div>
  )
}

export default App