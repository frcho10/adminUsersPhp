import './App.css'
import { Route, Routes } from 'react-router'

import Login from './components/Login'
import ListadoUsers from './components/ListadoUsers'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/listadoUsers' element= { <ListadoUsers /> } />
      </Routes>
    </>
  )
}

export default App
