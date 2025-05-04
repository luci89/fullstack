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
  const [message, setMessage] = useState(null)

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

  const Banner = () => {
    const bannerStyle = {
      left: '10px',
      right: '10px',
      borderStyle: 'solid',
      borderWidth: '2px',
      backgroundColor: 'lightgrey',
      padding: '20px'
    }

    if (message) {
      if (message.msgType === 'success') {
        bannerStyle.color = 'green'
        bannerStyle.borderColor = 'green'
      } else {
        bannerStyle.color = 'red'
        bannerStyle.borderColor = 'red'
      }

      return (
        <div style={bannerStyle}>
          {message.msg}
        </div>
      )
    }

    return null
  }

  useEffect(() => {
    listUpdate()
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Banner />
      <Filter currentState={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a New</h2>
      <AddPerson currentName={newName} currentNumber={newNumber} currentList={persons} updateName={setNewName} updateNumber={setNewNumber} updateList={setPersons} updateDisplay={setShownNumber} updateFilter={setFilter} listUpdate={listUpdate} message={setMessage} />
      <h2>Numbers</h2>
      <Persons shownList={shownNumber} updateList={listUpdate} message={setMessage}/>
    </div>
  )
}

export default App