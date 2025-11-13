import { signOut } from 'firebase/auth';
import { use, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../assets/logo3.png';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../firebase/firebase.init';

const Navbar = () => {
  const { user } = use(AuthContext);

  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThem = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allvehicles">All Vehicles</NavLink>
      </li>
      <li>
        <NavLink to="/addvehicle">Add Vehicle</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/myvehicles">My Vehicles</NavLink>
          </li>
          <li>
            <NavLink to="/mybookings">My Bookings</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      {/* 🔒 Fixed Glass Navbar */}
      <div className="navbar glass shadow fixed top-0 left-0 mx-auto z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="navbar-start">
          <img
            className="md:w-[80px] md:h-[80px] w-[60px] rounded-full"
            src={logo}
            alt=""
          />
          <h1 className="md:text-2xl text-lg font-bold style-font">
            TravelEase
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-semibold px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1 tooltip"
              data-tip={user?.displayName || ''}
            >
              {user ? (
                <img
                  className="w-[35px] rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow right-0 overflow-hidden font-semibold"
            >
              {links}
              <h1>Theme</h1>
              <input
                onChange={(e) => handleThem(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem('theme') === 'dark'}
                className="toggle"
              />
            </ul>
          </div>

          <div className="space-x-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-black lg:px-8 lg:py-3 rounded-full font-semibold shadow-md p-2
                       hover:bg-black hover:text-white transition duration-300"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-red-600 text-black lg:px-8 lg:py-3 rounded-full font-semibold shadow-md p-2
                       hover:bg-black hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 text-black lg:px-8 lg:py-3 rounded-full font-semibold shadow-md p-2
                       hover:bg-black hover:text-white transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* নিচের কনটেন্ট যাতে ঢেকে না যায় */}
      <div className="pt-[90px]"></div>
    </>
  );
};

export default Navbar;
