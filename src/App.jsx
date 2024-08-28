import './bootstrap.min.css'
import Landing from './Pages/Landing/Landing'
import AllProjects from './Pages/AllProjects/AllProjects'
import Dashboard from './Pages/Dashboard/Dashboard'
import Auth from './Pages/Auth/Auth'
import Footer from './Components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from './Context/AuthContext'
import { useContext } from 'react'
function App() {
  const { authStatus, setsetAuthStatus } = useContext(authContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/all-projects' element={authStatus ? <AllProjects /> : <Auth />} />
        <Route path='/dashboard' element={authStatus ? <Dashboard /> : <Auth />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
      <ToastContainer theme='dark' stacked transition={Zoom} limit={3} />
    </>
  )
}

export default App
