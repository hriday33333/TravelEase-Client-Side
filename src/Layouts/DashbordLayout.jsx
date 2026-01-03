import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
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

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= Drawer Content ================= */}
      <div className="drawer-content">
        {/* ================= Navbar ================= */}
        <nav className="navbar w-full bg-base-300 glass">
          {/* Sidebar toggle */}
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost glass"
          >
            <FiMenu className="my-1.5 inline-block size-4" />
          </label>

          {/* Logo + Theme toggle */}
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

        {/* ================= Dynamic Page Content ================= */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 glass">
          <ul className="menu w-full grow gap-2">
            {/* Homepage */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right glass"
                data-tip="Homepage"
              >
                <FiHome className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* All Vehicles */}
            <li>
              <Link
                to="/dashboard/allvehicles"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right glass"
                data-tip="All Vehicles"
              >
                <FiTruck className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">All Vehicles</span>
              </Link>
            </li>

            {/* Add Vehicle */}
            <li>
              <Link
                to="/dashboard/addvehicle"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right glass"
                data-tip="Add Vehicle"
              >
                <FiPlusSquare className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Add Vehicle</span>
              </Link>
            </li>

            {/* My Vehicles */}
            <li>
              <Link
                to="/dashboard/myvehicles"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right glass"
                data-tip="My Vehicles"
              >
                <FiUser className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">My Vehicles</span>
              </Link>
            </li>

            {/* My Bookings */}
            <li>
              <Link
                to="/dashboard/mybookings"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right glass"
                data-tip="My Bookings"
              >
                <FiBookOpen className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">My Bookings</span>
              </Link>
            </li>

            {/* Settings */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right glass"
                data-tip="Settings"
              >
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
