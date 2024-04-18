import logo from '../assets/Images/logo.png'
import img from '../assets/Images/side.jpg'

function CleranceCertificate({
    forwardedRef, 
    name,
    cat,
    address,
    date,
}) {
  return (
    <div ref={forwardedRef}>
<div className="flex justify-center items-center">
              <img src={logo} className="logo absolute left-[16rem] top-[14rem] w-[40rem] h-[31rem] z-[-4] opacity-20" alt="" />
              </div>
            <div className="absolute mt-8">
            <img  className="h-28 bg-cover w-32 rounded-full ml-10" src={logo} alt="" />
            <img src={img} className='w-[210px] h-[800px]' alt="" />
            </div>
            <div className="flex flex-col  items-center justify-center mt-4 ">
              <span className="ml-36">Republic of the Philippines</span>
              <span className="ml-36">City of Cebu</span>
              <span className="font-semibold ml-36">BARANGAY Guadalupe</span>
              <span className="font-semibold text-3xl mt-6 ml-36  ">C &nbsp; E &nbsp; R &nbsp;  T&nbsp;  I&nbsp;  F &nbsp; I&nbsp;  C &nbsp; A &nbsp; T &nbsp; I&nbsp;  O &nbsp; N</span>
            </div>
              <div className="flex flex-col ml-60 mt-10">
              <span>TO WHOM IT MAY CONCERN </span>
              <span className="mt-10">This is to certify that <input value={name} readOnly className="border-b text-center border-black font-bold w-[30rem] bg-transparent " type="text" /></span>
              <span className="mt-4">of <input readOnly value={address} className="border-b border-black w-[35rem] bg-transparent font-bold pl-8" type="text" /></span>
              <span className="mt-8">this certification is issued upon the request of <input value={cat} readOnly className="border-b font-bold text-center bg-transparent border-black w-[24rem] " type="text" /> </span>
              <span className="mt-4">application for <input readOnly className="border-b bg-transparent border-black w-[23.5rem] " type="text" /> </span>
              <span className="mt-8">issued this <input value={date} readOnly className="border-b text-center border-black w-[20rem] bg-transparent pl-10 font-bold " type="text" /> at barangay Guadalupe</span>
              <span className="mt-4"> Cebu City, Philippines</span>
              <span className="text-center mr-10 mt-6 font-medium">Cleared by:</span>
              <div className="flex flex-col justify-center items-center mt-6 ml-16">
              <span className="ml-9 "><input className="border-b border-black w-56" type="text" /></span>
              <span>District Barangay Kagawad</span>
              </div>
              <span className="text-center mr-[3.6rem] mt-10">Noted by</span>
              <div className="flex flex-col justify-center items-center mt-6 ml-16">
              <span className="ml-14 "><input className="border-b border-black w-64" type="text" /></span>
              <span className="ml-10 font-bold ">HON. APOL ROSS GACASAN ENRIQUEZ</span>
              <span className="ml-7">Barangay Captain</span>
              </div>
            </div>
    </div>
  )
}

export default CleranceCertificate