import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'timeago.js'

export default function NotesLists() {
  const [notes, setNotes] = useState([])

  const handleClick = (id) => {
    axios.delete(`http://localhost:3000/api/notes/${id}`)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/notes')
    .then(res => setNotes(res.data))
  }, [handleClick])

  return (
    <div className="w-full px-10 grid grid-cols-2 gap-10">
      {
        notes.map(note => (
          <div key={note._id} className="bg-zinc-900 p-8 border border-zinc-400 rounded-md grid grid-cols-2">
            <div className="mr-5">
              <h2 className="text-slate-400 text-lg">
                <span className="text-white">Title: </span>
                {note.title}
              </h2>
              <p className="text-slate-400 text-lg">
                <span className="text-white">Content: </span>
                {note.content}
              </p>
              <p className="text-slate-400 text-lg">
                <span className="text-white">Author: </span>
                {note.author}
              </p>
              <p className="text-slate-400 text-lg">{format(note.date)}</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="mx-3">
                <button 
                  className="bg-red-700 p-3 text-lg text-white rounded-md"
                  onClick={() => handleClick(note._id)}>
                  Delete
                </button>
              </div>
              <div className="mx-3">
                <Link
                  className="bg-stone-700 p-3 text-lg text-white rounded-md" 
                  to={`/edit/${note._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
