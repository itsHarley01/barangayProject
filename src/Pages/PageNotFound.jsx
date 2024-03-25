import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-lg mb-4">Page Not Found.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go Back</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
