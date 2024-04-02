import HeroP from '../../Components/HeroP'
import Footer from '../../Components/Footer'
import StaticNavBar from '../../Components/Navigation/StaticNavBar'

function DownloadApp() {
  return (
    <div>
        <StaticNavBar />
        <HeroP text='Download Application'/>
        <div className='text-center my-[20vh]'>
          <h1 className='text-6xl font-semibold text-gray-600 '>Coming soon...</h1>
        </div>
    </div>
  )
}

export default DownloadApp