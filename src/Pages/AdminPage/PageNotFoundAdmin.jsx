
import{Link} from 'react-router-dom'
function PageNotFoundAdmin(){

    return(
        <div className="">
            <div className=''>
            <h1>404</h1>
            <p>Page Not Found. </p>
            <Link className='' to='/admin'>Go Back</Link>
            </div>
        </div>
    )
}
export default PageNotFoundAdmin