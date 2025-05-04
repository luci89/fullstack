import phonebookService from './services/phonebook'

const Persons = ({ shownList, updateList }) => {
    const handlePersonDeletion = (event) => {
        event.preventDefault()
        if (confirm(`Delete ${event.target.name}?`)) {
            phonebookService
                .deletePerson(event.target.id)
                .then(
                    updateList()
                )
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