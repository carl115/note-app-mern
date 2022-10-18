const { Router } = require('express')

const { 
    getNotes, 
    createNotes,
    getNote,
    updateNote,
    deleteNote 
} = require('../controllers/notes.controller')

const router = Router()

router.route('/')
    .get(getNotes)
    .post(createNotes)

router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)

module.exports = router