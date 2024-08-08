import './App.css'
import {Header, Footer} from './components/index'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'

function App() {

  return (
    <>
      <p>A Blog app with appwrite</p>
      <Header>Header</Header>
      <main>
        Main
      </main>
      <Footer>Footer</Footer>
    </>
  )
}

export default App
