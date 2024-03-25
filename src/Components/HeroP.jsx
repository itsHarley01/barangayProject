import imgbg from '../assets/Images/img1.jpg';

function HeroP(props) {
  return (
    <div>
      <div id="about" className="h-[550px]  w-full flex justify-center text-center items-center">
        <div className="bg-cover bg-center h-[550px]  absolute inset-0" style={{ backgroundImage: `url(${imgbg})`, opacity: '0.3' }}></div>
        <h1 className="text-transparent bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-7xl block font-semibold">{props.text}</h1>
      </div>
    </div>
  );
}

export default HeroP;
