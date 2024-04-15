
import Hero from "../../Components/HomeComponents/Hero"
import MVGfh from "../../Components/HomeComponents/MVGfh"
import MobileApp from "../../Components/HomeComponents/MobileApp"
import Officials from "../../Components/HomeComponents/Officials"
import Slider from "../../Components/HomeComponents/Slider"
import StaticNavBar from "../../Components/Navigation/StaticNavBar"
import ExServices from "../../Components/HomeComponents/ExServices"



function Home() {

  return (
    <div >
      <StaticNavBar />
      <Hero />
      <MVGfh />
      <Slider />
      <MobileApp />
      <Officials />
      <ExServices />
    </div>
  )
}


export default Home