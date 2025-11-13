import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className='mx-auto'>
        <Navbar></Navbar>
      </nav>

      <main className="flex-grow w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
