import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router'
import MyRoutes from './myRoutes'

function App() {
  return (
    <BrowserRouter>
    <MyRoutes/>
    </BrowserRouter>
  )
}

export default App
