import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CreateUser() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")

  const handleChange = e => {
    setUsername(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setUsername("")

    await axios.post('http://localhost:3000/api/users', {
      username: username
    })
  }

  const handleDoubleClick = async (id) => {
    await axios.delete(`http://localhost:3000/api/users/${id}`)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
    .then(res => setUsers(res.data))
  }, [handleSubmit, handleDoubleClick])

  return (
    <div className="w-full h-auto px-60 grid grid-cols-2">
      <div className="bg-zinc-900 w-72 h-auto p-7 border border-zinc-400 rounded-lg">
        <h2 className="mb-8 text-3xl text-center text-white">
          Create New User
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="text"
              className="bg-zinc-700 w-full h-9 mb-6 text-lg text-slate-400 border border-2 border-lime-500 rounded-sm focus:outline-none focus:ring focus:ring-lime-900"
              placeholder="Enter username" 
              value={username}
              onChange={handleChange} 
              required
            />
          </div>
          <input 
            type="submit" 
            className="bg-lime-600 w-full p-2 text-lg text-white border border-lime-500 cursor-pointer rounded-md hover:bg-lime-700" 
            value="Save" 
          />
        </form>
      </div>
      <div>
        <ul>
          {
            users.map(user => (
              <li 
                key={user._id} 
                className="bg-zinc-900 w-full p-3 border border-zinc-400 text-lg text-slate-400 hover:bg-zinc-600"
                onDoubleClick={() => handleDoubleClick(user._id)}
              >
                {user.username}
              </li> 
            ))
          }
        </ul>
      </div>
    </div>
  )
}
