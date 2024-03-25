import spinninglogo from '../../assets/animated/spinninglogo.gif'
const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex justify-center items-center">
      <div className="h-36 w-auto">
        <img src={spinninglogo} alt="Loading" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

//NOTES

//import LoadingAnimation 

// usetate
// const [loading, setLoading] = useState(false); 

// setter
// setLoading(true);
// setLoading(false);

// optional 
// {loading ? 'text...' : 'text'}

// add this for display
// {loading && <LoadingAnimation/>}

export default LoadingAnimation;