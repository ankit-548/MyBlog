import { useEffect, useState } from 'react'
import './App.css'
import {Header, Footer} from './components/index'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.service'

function App() {
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    authService.getLoggedInUser()
    .then((userData) => {
      if(userData) {
        useDispatch(login(userData));
      } else {
        useDispatch(logout);
      }
    }).catch("Loading Error....")
    .finally(() => {
      setLoading(false);
    })
  }, [])
  return !loading ? (
    <div class="bg-blue-500 ">
      <p>A Blog app with appwrite</p>
      <Header>Header</Header>
      <main>
        Main
      </main>
      <Footer>Footer</Footer>
    </div>
  ) : (null);
}

export default App
