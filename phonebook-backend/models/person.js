const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to:', url)

mongoose
    .connect(url)
    .then(result => {
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log('fail connect to mongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d{5,}/.test(v);
            }
        }
    },
})

personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)