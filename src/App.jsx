import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router'
import MyRoutes from './MyRoutes'

function App() {
  return (
    <BrowserRouter>
    <MyRoutes/>
    </BrowserRouter>
  )
}

export default App
