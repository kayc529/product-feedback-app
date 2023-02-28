import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginRegisterCard from '../components/login-register/LoginRegisterCard';
import { Footer } from '../components/common';

const LoginRegisterPage = () => {
  const { user } = useSelector((state) => state.user);

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <div className='w-full h-screen pt-pageTop flex flex-col'>
      <LoginRegisterCard />
      <Footer />
    </div>
  );
};

export default LoginRegisterPage;
