const express = require('express')
const cors = require('cors')

const app = express()

//SETTINGS
app.set('port', process.env.PORT || 3000)

//MIDDLEWARES
app.use(cors())
app.use(express.json())

//ROUTES
/*
app.get('/api/users', (req, res) => res.send('Users page'))
app.get('/api/notes', (req, res) => res.send('Notes page'))
*/
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/notes', require('./routes/notes.routes'))


module.exports = app