import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux';
import {store} from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, Login } from './components/index.js'
import AddPost from './pages/AddPost.jsx';
import AllPost from './pages/AllPosts.jsx';
import EditPost from './pages/EditPost.jsx';
import Home from './pages/Home.jsx';
// import Login from './pages/Login.jsx';
import Post from './pages/Post.jsx';
import Signup from './pages/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authenticatin={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authenticatin={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/addPost",
        element: (
          <AuthLayout authenticatin={true}>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/allPost",
        element: (
          // <AuthLayout authenticatin={true}>
            <AllPost />
          // </AuthLayout>
        )
      },
      {
        path: "/editPost/:slug",
        element: (
          <AuthLayout authenticatin={true}>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authenticatin={true}>
            <Post />
          </AuthLayout>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
