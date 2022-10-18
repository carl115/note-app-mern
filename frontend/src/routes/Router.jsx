import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import NotesLists from '../components/NotesLists'
import CreateNote from '../components/CreateNote'
import CreateUser from '../components/CreateUser'
import PageNotFound from './PageNotFound'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "/",
                element: <NotesLists />
            },
            {
                path: "/edit/:id",
                element: <CreateNote />
            },
            {
                path: "/create",
                element: <CreateNote />
            },
            {
                path: "/user",
                element: <CreateUser />
            }
        ]
    }
])