import phonebookService from './services/phonebook'

const AddPerson = ({ currentName, currentNumber, currentList, updateName, updateNumber, updateList, updateDisplay, updateFilter, listUpdate, message }) => {
    const handleNameChange = (event) => {
        updateName(event.target.value)
    }

    const handleNumberChange = (event) => {
        updateNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const found = currentList.find(x => {
            return x.name.toLocaleLowerCase() === currentName.toLocaleLowerCase() ? x : null
        })
        if (found) {
            if (confirm(`${currentName} is already added to phonebook, replace the old number with a new one?`)) {
                const personObject = found
                personObject.number = currentNumber
                phonebookService
                    .updatePerson(personObject)
                    .then(() => {
                        listUpdate()
                        updateName('')
                        updateNumber('')
                        updateFilter('')
                    }).catch(err => {
                        if (err.status === 404) {
                            message({ msg: `Information of ${currentName} has already been removed from server`, msgType: 'error' })
                            setTimeout(() => {
                                message(null)
                            }, 3000)
                        } else {
                            message({ msg: err.status, msgType: 'error' })
                            setTimeout(() => {
                                message(null)
                            }, 3000)
                        }
                    })
            }
        } else {
            const personObject = {
                name: currentName,
                number: currentNumber
            }
            phonebookService
                .createPerson(personObject)
                .then(returnedPerson => {
                    updateList(currentList.concat(returnedPerson))
                    updateDisplay(currentList.concat(returnedPerson))
                    updateName('')
                    updateNumber('')
                    updateFilter('')
                    message({ msg: `Added ${returnedPerson.name}`, msgType: 'success' })
                    setTimeout(() => {
                        message(null)
                    }, 3000)
                })
        }
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