const Persons = ({ shownList }) => {
    return (
        <div>
            {
                shownList.map(x => <p key={x.name}>{x.name} {x.number}</p>)
            }
        </div>
    )
}

export default Persons