
import{Link, useNavigate} from 'react-router-dom'

function PageNotFoundAdmin(){
    const usenav = useNavigate()


    return(
        <div className="">
            <div className=''>
            <p>
            {console.log(getIsLoggedIn())}
            </p>
            <h1>404</h1>
            <p>Page Not Found. </p>
            <Link className='' to='/login'>Go Back</Link>
            </div>
        </div>
    )
}
export default PageNotFoundAdmin