import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import AllVehicles from './Components/AllVehicles.jsx';
import Home from './Components/Home.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import './index.css';
import Root from './Layouts/Root.jsx';
import Register from './Pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'allvehicles',
        element: <AllVehicles></AllVehicles>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
