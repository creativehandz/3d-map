import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="absolute top-4 right-4 flex gap-4">
        <Link to="/gallery">
          <button className="hover:scale-105 transition text-green text-lg bg-white px-6 py-2 rounded-full w-fit">
              Gallery
          </button>
        </Link>
        <Link to="/investor-relations">
          <button className="hover:scale-105 transition text-green text-lg bg-white px-6 py-2 rounded-full w-fit">
            Investor Relations
          </button>
        </Link>
        <Link to="/project-overview">
          <button className="hover:scale-105 transition text-green text-lg bg-white px-6 py-2 rounded-full w-fit">
          Project Overview
          </button>
        </Link>
       
      </nav>
    );
  };
  
  export default Navbar;