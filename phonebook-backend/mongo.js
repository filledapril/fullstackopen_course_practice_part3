const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.d30mqw2.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){

  mongoose
    .connect(url)
    .then((result) => {
    const person = new Person({
          name: newName,
          number: newNumber,
      })

      return person.save()
    })
    .then(() => {
      console.log(`Added ${newName} number ${newNumber} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

if(process.argv.length === 3){

  mongoose
    .connect(url)
    .then((result) => {
      Person
        .find({})
        .then(result => {
          result.map(p => {
            console.log(`${p.name} ${p.number}`)
          })
          mongoose.connection.close()
        })
    })

}