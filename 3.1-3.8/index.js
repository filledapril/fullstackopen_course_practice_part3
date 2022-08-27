const { request, response } = require('express');
const express = require('express');
const app = express();

const morgan = require('morgan');

morgan.token('body', (request) => JSON.stringify(request.body));

app.use(express.json())
app.use(morgan('tiny'))




let persons = [
            {
                "id": 1,
                "name": "Arto Hellas",
                "number": "040-123456"
            },
            {
                "id": 2,
                "name": "Ada Lovelace",
                "number": "39-44-5323523"
            },
            {
                "id": 3,
                "name": "Dan Abramov",
                "number": "12-43-234345"
            },
            {
                "id": 4,
                "name": "Mary Poppendieck",
                "number": "39-23-6423122"
            }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    const total = persons.length
    const date = new Date();

    response.send(
        `Phonebook has info for ${total} people <br />
        ${date}`
        )
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
    response.json(person)
    } else {
    response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 9999)
}

app.post('/api/persons', morgan(':body'), (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
          error: 'name or number missing'
        })
      }
    
    if(persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
          })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})