const Header = ({ course }) => {
    return (
        <div>
            <h1>{course}</h1>
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <div>
            <p>{part} {exercises}</p>
        </div>
    )
}

const Content = ({ parts }) => {
    const contentBody = parts.map(p => <Part key={p.id} part={p.name} exercises={p.exercises} />)
    return (
        <div>
            {contentBody}
        </div>
    )
}


const Total = ({ parts }) => {
    const total = Object.values(parts).reduce((x, { exercises })=> x + exercises, 0)
    return (
        <div>
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course