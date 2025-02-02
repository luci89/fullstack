import phonebookService from './services/phonebook'

const AddPerson = ({ currentName, currentNumber, currentList, updateName, updateNumber, updateList, updateDisplay, updateFilter }) => {
    const handleNameChange = (event) => {
        updateName(event.target.value)
    }

    const handleNumberChange = (event) => {
        updateNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const found = currentList.find(x => {
            return x.name.toLocaleLowerCase() === currentName.toLocaleLowerCase() ? true : false
        })
        if (found) {
            return alert(`${currentName} is already added to phonebook`)
        }

        const personObject = {
            name: currentName,
            number: currentNumber
        }
        phonebookService
            .addPerson(personObject)
            .then(returnedPerson => {
                updateList(currentList.concat(returnedPerson))
                updateDisplay(currentList.concat(returnedPerson))
                updateName('')
                updateNumber('')
                updateFilter('')
            })
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={currentName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={currentNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddPerson