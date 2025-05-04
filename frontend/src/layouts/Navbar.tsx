import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">My App</h1>
        <div>
          <Link to="/" className="text-white mx-4 hover:underline">
            Home
          </Link>
          <Link to="/login" className="text-white mx-4 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
