
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'
const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Body