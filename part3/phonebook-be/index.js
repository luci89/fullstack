const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const info = `Phonebook has info for ${persons.length} people`
    const now = new Date()
    const infoTime = now.toString()
    response.send(`<p>${info}</p><p>${infoTime}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(x => x.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(x => x.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id = persons.length + 1
    if (person.name) {
        const duplicate = persons.find(x => x.name.toLocaleLowerCase() === person.name.toLocaleLowerCase())
        if (duplicate) {
            response.status(409).json({
                error: 'name must be unique'
            })
        } else {
            persons.push(person)
            response.status(200).end()
        }
    } else {
        response.status(400).json({
            error: 'name cannot be empty'
        })
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})