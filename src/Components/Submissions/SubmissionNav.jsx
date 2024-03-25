import { NavLink } from "react-router-dom"

function SubmissionNav({title}) {
  return (
    <div className='w-full pb-4'>
        <div className=' text-left border-b w-full'>
            <h1 className=' font-semibold text-3xl pb-4'>{title}</h1>
            <div>  
                <nav className=" flex gap-6">
                    <NavLink to='/admin/submissions/pending' >All Submissions</NavLink>
                    <NavLink to='/admin/submissions/pending/barangay-clearance' >Barangay Clerance</NavLink>
                    <NavLink to='/admin/submissions/pending/pwd' >PWD Application</NavLink>
                    <NavLink to='/admin/submissions/pending/senior-citizen' >Senior Citizen Application</NavLink>
                    <NavLink to='/admin/submissions/pending/complaints' >Complaints</NavLink>
                </nav>     
            </div>
        </div>
    </div>
  )
}

export default SubmissionNav