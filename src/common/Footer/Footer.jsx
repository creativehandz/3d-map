const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div>
          <a href="/" className="text-2xl text-white opacity-70">
            <img src="./ibtec-logo-t.png" className="w-24" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-white opacity-80 text-xl">
          <p>Copyright 2024</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
