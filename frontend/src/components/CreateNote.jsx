import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateNote() {
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [editing, setEditing] = useState(false)

  const { id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newNote = {
      title: title,
      content: content,
      data: startDate,
      author: userSelected
    }

    if (editing) {
      await axios.put(`http://localhost:3000/api/notes/${id}`, newNote)
    }
    else {
      await axios.post('http://localhost:3000/api/notes', newNote)
    }

    window.location.href = "/"
  }

  const handleChangeUserSelected = e => setUserSelected(e.target.value)
  const handleChangeTitle = e => setTitle(e.target.value)
  const handleChangeContent = e => setContent(e.target.value)
  const handleChangeStartDate = date => setStartDate(date)

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then(res => {
        setUsers(res.data.map(user => user.username))
        setUserSelected(res.data[0].username)
      })

    if (id) {
      axios.get(`http://localhost:3000/api/notes/${id}`)
        .then(res => {
          setTitle(res.data.title)
          setContent(res.data.content)
          setStartDate(new Date(res.data.date))
          setUserSelected(res.data.author)
        })

      setEditing(true)
    }
  }, [])

  return (
    <div className="bg-zinc-900 w-96 h-auto border border-zinc-400 p-8 rounded-lg">
      <h2 className="mb-8 text-3xl text-center text-white">
        Create a Note
      </h2>
      <div>
        <select
          name="userSelected"
          className="bg-zinc-700 w-full h-9 mb-6 text-lg text-slate-400 border border-2 border-lime-500 rounded-sm focus:outline-none focus:ring focus:ring-lime-900"
          onChange={handleChangeUserSelected}
          value={userSelected}
        >
          {
            users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))
          }
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Title"
          className="bg-zinc-700 w-full h-9 mb-6 text-lg text-slate-400 border border-2 border-lime-500 rounded-sm focus:outline-none focus:ring focus:ring-lime-900"
          onChange={handleChangeTitle}
          value={title}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          className="bg-zinc-700 w-full h-16 mb-6 text-lg text-slate-400 border border-2 border-lime-500 resize-none rounded-sm focus:outline-none focus:ring focus:ring-lime-900"
          onChange={handleChangeContent}
          value={content}
          required
        >
        </textarea>
      </div>
      <div>
        <DatePicker
          className="bg-zinc-700 w-full h-9 mb-6 text-lg text-slate-400 border border-2 border-lime-500 rounded-sm focus:outline-none focus:ring focus:ring-lime-900"
          selected={startDate}
          onChange={handleChangeStartDate}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="submit"
          className="bg-lime-600 w-full p-2 text-lg text-white border border-lime-500 cursor-pointer rounded-md hover:bg-lime-700" 
          value="Save" 
        />
      </form>
    </div>
  )
}
