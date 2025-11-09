import { use } from 'react';
import { NavLink } from 'react-router';
import logo from '../assets/logo3.png';
import { AuthContext } from '../Context/AuthContext';
const Navbar = () => {
  const { user } = use(AuthContext);

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
    <div className="navbar bg-base-100  ">
      <div className="navbar-start ">
        <img
          className="md:w-[80px] md:h-[80px] w-[60px] rounded-full"
          src={logo}
          alt=""
        />
        <h1 className="md:text-2xl text-lg font-bold style-font ">
          TravelEase
        </h1>
      </div>
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="space-x-2">
          {user ? (
            <a className="bg-red-600 rounded-l-full p-1">Log out</a>
          ) : (
            <>
              <a className="bg-red-600 rounded-l-full p-1">Login</a>
              <a className="bg-red-600 rounded-e-full p-1">Register</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
