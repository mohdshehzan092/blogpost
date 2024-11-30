import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Header} from './components'
import { Outlet } from 'react-router-dom'


import './App.css'
import { Footer } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex felx-wrap justify-center bg-gray-500'>
      <div className='w=full block'>
        <Header />
        <main>
          TODO: <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ): null
}


export default App
