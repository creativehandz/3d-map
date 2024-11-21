const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-8">
      <nav className="text-white flex items-center justify-between container mx-auto">
        {/* Logo */}
        <div>
          <a href="/" className="text-4xl">
            <img src="./ibtec-logo-t.png" className="w-24" />
          </a>
        </div>

        {/* Links */}
        <ul className="flex items-center justify-end gap-6 text-2xl font-light">
          <li className="p-2 cursor-pointer">
            <a href="/page-one">Gallery</a>
          </li>

          <li className="p-2 cursor-pointer">
            <a href="/page-two">Investor Relation</a>
          </li>
          <li className="p-2 cursor-pointer">
            <a href="/page-three">Project Overview</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
