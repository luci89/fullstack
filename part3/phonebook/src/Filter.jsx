const Filter = ({ currentState, handleFilterChange}) => {
    return (
        <form>
            <div>
                filter shown with <input value={currentState} onChange={handleFilterChange} />
            </div>
        </form>
    )
}

export default Filter