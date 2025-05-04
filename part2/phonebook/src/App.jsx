import { useState, useEffect } from 'react'
import Filter from './Filter'
import AddPerson from './AddPerson'
import Persons from './Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownNumber, setShownNumber] = useState(persons)

  const showFiltered = (list, filterValue) => {
    if (filterValue === '') {
      setShownNumber(list)
    } else {
      setShownNumber(list.filter(x => x.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())))
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    showFiltered(persons, event.target.value)
  }

  const listUpdate = () => {
    phonebookService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
        showFiltered(returnedPersons, filter)
      })
  }

  useEffect(() => {
    listUpdate()
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter currentState={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a New</h2>
      <AddPerson currentName={newName} currentNumber={newNumber} currentList={persons} updateName={setNewName} updateNumber={setNewNumber} updateList={setPersons} updateDisplay={setShownNumber} updateFilter={setFilter} listUpdate={listUpdate}/>
      <h2>Numbers</h2>
      <Persons shownList={shownNumber} updateList={listUpdate} />
    </div>
  )
}

export default App