import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logo3.png';

import {
  FiBookOpen,
  FiHome,
  FiMenu,
  FiPlusSquare,
  FiSettings,
  FiTruck,
  FiUser,
} from 'react-icons/fi';

const DashbordLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThem = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const activeClass =
    'text-red-600 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10';

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= Drawer Content ================= */}
      <div className="drawer-content">
        {/* ================= Navbar ================= */}
        <nav className="navbar w-full bg-base-300 glass">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost glass"
          >
            <FiMenu className="my-1.5 inline-block size-4" />
          </label>

          <div className="flex-1 flex justify-between items-center">
            <Link to="/">
              <div className="flex items-center">
                <img
                  className="md:w-[80px] md:h-[80px] w-[60px] rounded-full"
                  src={logo}
                  alt=""
                />
                <h1 className="md:text-2xl text-lg font-bold style-font">
                  TravelEase
                </h1>
              </div>
            </Link>

            <input
              onChange={(e) => handleThem(e.target.checked)}
              type="checkbox"
              defaultChecked={localStorage.getItem('theme') === 'dark'}
              className="toggle"
            />
          </div>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 glass">
          <ul className="menu w-full grow gap-2 mt-5">
            {/* Homepage */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `glass ${isActive ? activeClass : ''}`
                }
              >
                <FiHome className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* All Vehicles */}
            <li className="mt-10">
              <NavLink
                to="/dashboard/allvehicles"
                className={({ isActive }) =>
                  `glass ${isActive ? activeClass : ''}`
                }
              >
                <FiTruck className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">All Vehicles</span>
              </NavLink>
            </li>

            {/* Add Vehicle */}
            <li>
              <NavLink
                to="/dashboard/addvehicle"
                className={({ isActive }) =>
                  `glass ${isActive ? activeClass : ''}`
                }
              >
                <FiPlusSquare className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Add Vehicle</span>
              </NavLink>
            </li>

            {/* My Vehicles */}
            <li>
              <NavLink
                to="/dashboard/myvehicles"
                className={({ isActive }) =>
                  `glass ${isActive ? activeClass : ''}`
                }
              >
                <FiUser className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">My Vehicles</span>
              </NavLink>
            </li>

            {/* My Bookings */}
            <li>
              <NavLink
                to="/dashboard/mybookings"
                className={({ isActive }) =>
                  `glass ${isActive ? activeClass : ''}`
                }
              >
                <FiBookOpen className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">My Bookings</span>
              </NavLink>
            </li>

            <div className="border-t-2 mt-40"></div>

            {/* Settings */}
            <li>
              <button className="glass">
                <FiSettings className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashbordLayout;
