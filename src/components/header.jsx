import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-screen py-4 px-3 text-3xl font-semibold bg-gray-700 text-white mb-8">
      <Link to="/">Employee Management App</Link>
    </div>
  );
};

export default Header;
