const Filter = ({ currentState, updateFilter, updateList, fullList }) => {
    const handleFilterChange = (event) => {
        updateFilter(event.target.value)
        if (event.target.value === '') {
            updateList(fullList)
        } else {
            updateList(fullList.filter(x => x.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
        }
    }

    return (
        <form>
            <div>
                filter shown with <input value={currentState} onChange={handleFilterChange} />
            </div>
        </form>
    )
}

export default Filter