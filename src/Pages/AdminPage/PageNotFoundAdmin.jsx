import { useAuth } from '../../AuthContext/auth';
import{Link} from 'react-router-dom'

function PageNotFoundAdmin(){
    const { getIsLoggedIn } = useAuth();


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