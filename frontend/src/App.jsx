import Login from './Pages/Login'
import SignupForm from './Pages/signupForm'
import Homepage from './Pages/homepage'
import {Routes , Route, Router , Navigate} from "react-router-dom"
import { useState } from 'react'
import MessageSaver from './Pages/messageSaver'

const App = () => {
  const [authenticated , setAuthenticated] = useState(false)
  return (
    
      <Routes>
      <Route path='/' element={ <Homepage />} />
      <Route path="/signup" element ={<SignupForm />}/>
      <Route path="/login" element= {<Login setAuthenticated={setAuthenticated} />} />
      <Route path="/messages" element={authenticated ? <MessageSaver /> : <Navigate to="/login" replace />} />
      <Route path="*" element={ <Navigate to='/login' replace /> } />
      </Routes> 
    
  )
}

export default App