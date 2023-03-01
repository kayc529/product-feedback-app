import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div
      className='w-36 h-20 bg-banner rounded-banner flex flex-col justify-center items-start items-center cursor-pointer'
      onClick={goToHome}
    >
      <p className='text-h1 text-white leading-lg'>
        <span className='font-bold'>F</span>rontend
      </p>
      <p className='text-h1 text-white leading-lg'>
        <span className='font-bold'>M</span>entor
      </p>
    </div>
  );
};

export default Logo;
