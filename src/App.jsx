import { useEffect, useState } from 'react'
import './App.css'
import {Header, Footer} from './components/index'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.service';
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect( () => {
    authService.getLoggedInUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    }).catch("Loading Error....")
    .finally(() => {
      setLoading(false);
    })
  }, [])
  return !loading ? (
    <div className="m-0 p-0 bg-green-50 w-full min-h-screen">
      <Header>Header</Header>
      <main className='mb-5'>
        <Outlet />
      </main>
      <Footer>Footer</Footer>
    </div>
  ) : (null);
}

export default App;
