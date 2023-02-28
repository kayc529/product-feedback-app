import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components/common';
const SharedLayout = () => {
  return (
    <main className='relative h-screen flex flex-col'>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default SharedLayout;
