import { useSelector } from 'react-redux';
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import LoginRegisterCard from '../components/login-register/LoginRegisterCard';
import { Footer, Logo } from '../components/common';

const LoginRegisterPage = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();

  if (user) {
    const returnTo = searchParams.get('return_to');
    return <Navigate to={`${returnTo ? returnTo : '/'}`} replace={true} />;
  }

  return (
    <div className='w-full h-screen pt-pageTop flex flex-col items-center'>
      <div className='mb-6'>
        <Logo />
      </div>
      <LoginRegisterCard />
      <Footer />
    </div>
  );
};

export default LoginRegisterPage;
