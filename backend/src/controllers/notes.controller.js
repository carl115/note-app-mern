const Note = require('../models/Note')

const notesCtrl = {}

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
}

notesCtrl.createNotes = async (req, res) => {
    const { title, content, date, author } = req.body

    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author
    })

    await newNote.save()

    res.json({ message: "Note saved" })
}

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id)

    res.json(note)
}

notesCtrl.updateNote = async (req, res) => {
    const { title, content, author } = req.body

    await Note.findByIdAndUpdate(req.params.id, {
        title: title,
        content: content,
        author: author
    })

    res.json({ message: "Note updated" })
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)

    res.json({ message: "Note deleted" })
}

module.exports = notesCtrl