import Footer from '../Components/Footer'
import NavBar from '../Components/Navigation/NavBar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
        <NavBar />
     
        <Outlet />

        <Footer />
    </div>
  )
}

export default MainLayout