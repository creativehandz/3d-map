const Navbar = () => {
    return (
      <nav className="absolute top-4 right-4 flex gap-4">
        <button className="hover:scale-105 transition text-green text-lg bg-white px-6 py-2 rounded-full w-fit">
          Gallery
        </button>
        <button className="hover:scale-105 transition text-green text-lg bg-white px-6 py-2 rounded-full w-fit">
          Investor Relations
        </button>
        <button className="hover:scale-105 transition text-green text-lg bg-white px-6 py-2 rounded-full w-fit">
        Project Overview
        </button>
      </nav>
    );
  };
  
  export default Navbar;