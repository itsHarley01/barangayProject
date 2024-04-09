import CreateNewAdmin from "../../../Components/AdminComponents/SuperAdminComponents/CreateNewAdmin"


function CreateAdmin() {
  return (        
    <div className=" flex flex-col justify-center items-center m-10">
      <h1 className=' border-b w-full font-semibold text-3xl pb-10'>Add New Admin</h1>

      <CreateNewAdmin />
    </div>
  )
}

export default CreateAdmin