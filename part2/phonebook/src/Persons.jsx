import phonebookService from './services/phonebook'

const Persons = ({ shownList, updateList, message }) => {
    const handlePersonDeletion = (event) => {
        event.preventDefault()
        if (confirm(`Delete ${event.target.name}?`)) {
            phonebookService
                .deletePerson(event.target.id)
                .then(
                    updateList()
                ).catch(err => {
                    if (err.status === 404) {
                        message({ msg: `Information of ${event.target.name} has already been removed from server`, msgType: 'error' })
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
    }

    return (
        <div>
            {
                shownList.map(x => (
                    <p key={x.name}>{x.name} {x.number} <button type='submit' onClick={handlePersonDeletion} id={x.id} name={x.name}>Delete</button></p>
                ))
            }
        </div>
    )
}

export default Persons