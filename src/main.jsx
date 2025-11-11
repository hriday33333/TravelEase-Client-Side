import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import AddVehicle from './Components/AddVehicle.jsx';
import AllVehicles from './Components/AllVehicles.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import Home from './Components/Home.jsx';
import MyBookings from './Components/MyBookings.jsx';
import MyVehicles from './Components/MyVehicles.jsx';
import UpdatePage from './Components/UpdatePage.jsx';
import ViewDetailsPage from './Components/ViewDetailsPage.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import './index.css';
import Root from './Layouts/Root.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsxPrivateRoute.jsx';

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
        path: '/allvehicles',
        element: <AllVehicles></AllVehicles>,
        loader: () => fetch('http://localhost:3000/vehicles'),
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
      {
        path: '/viewdetailspage/:id',
        element: (
          <PrivateRoute>
            <ViewDetailsPage></ViewDetailsPage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/models/${params.id}`),
      },
      {
        path: 'addvehicle',
        element: (
          <PrivateRoute>
            <AddVehicle></AddVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: '/update/:id',
        element: (
          <PrivateRoute>
            <UpdatePage></UpdatePage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/models/${params.id}`),
      },
      {
        path: 'myvehicles',
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: '/mybookings',
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: '/*',
        element: <ErrorPage></ErrorPage>,
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
