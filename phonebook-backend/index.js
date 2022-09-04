require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()

const Person = require('./models/person')

const cors = require('cors')
const morgan = require('morgan')



morgan.token('body', (request) => JSON.stringify(request.body))

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info',(request, response) => {
  const date = new Date()

  Person.count().then(result => {
    response.send(
      `Phonebook has info for ${result} people <br />
      ${date}`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', morgan(':body'), (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPeople => {
    response.json(savedPeople)
  })
})

app.put('/api/persons/:id', (request, response, next) => {

  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPeople => {
      response.json(updatedPeople)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result, error) => {
      if(error){
        response.status(204).end()
      } else {
        console.log(`${result.name} has been remove from phonebook `)
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, respnse, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if(error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//---previous exercise-------
// let persons = [
//             {
//                 "id": 1,
//                 "name": "Arto Hellas",
//                 "number": "040-123456"
//             },
//             {
//                 "id": 2,
//                 "name": "Ada Lovelace",
//                 "number": "39-44-5323523"
//             },
//             {
//                 "id": 3,
//                 "name": "Dan Abramov",
//                 "number": "12-43-234345"
//             },
//             {
//                 "id": 4,
//                 "name": "Mary Poppendieck",
//                 "number": "39-23-6423122"
//             }
// ]


// app.get('/info', (request, response) => {
//     const total = persons.length
//     const date = new Date();

//     response.send(
//         `Phonebook has info for ${total} people <br />
//         ${date}`
//         )
//   })

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(p => p.id === id)

//     if(person) {
//     response.json(person)
//     } else {
//     response.status(404).end()
//     }
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(p => p.id !== id)

//     response.status(204).end()
// })

// const generateId = () => {
//     return Math.floor(Math.random() * 9999)
// }


// if(persons.find(p => p.name === body.name)) {
//     return response.status(400).json({
//         error: 'name must be unique'
//       })
// }


//https://lit-mountain-34512.herokuapp.com/api/persons