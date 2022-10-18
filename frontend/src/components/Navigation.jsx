import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className="bg-zinc-700 py-5 text-white">
      <div className="flex justify-between items-center mx-10">
        <p className="text-3xl font-bold">Notes application</p>
        <div>
          <Link 
            className="mx-3 text-lg text-slate-400 hover:text-white" 
            to={'/'}
          >
            Notes
          </Link>
          <Link 
            className="mx-3 text-lg text-slate-400 hover:text-white" 
            to={'create'}
          >
            Create note
          </Link>
          <Link 
            className="mx-3 text-lg text-slate-400 hover:text-white" 
            to={'user'}
          >
            Create user
          </Link>
        </div>
      </div>
    </div>
  )
}
