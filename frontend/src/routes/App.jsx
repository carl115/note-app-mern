import { Outlet } from 'react-router-dom'

import Navigation from '../components/Navigation'

export default function App() {
  return(
    <div className="bg-zinc-800 h-screen grid grid-cols-1 grid-rows-[80px_minmax(520px,_100px)]">
      <Navigation />
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}