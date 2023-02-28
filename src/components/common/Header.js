import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ButtonColors } from '../../data/colors';
import { logoutUser } from '../../features/user/userSlice';
import { toastMessage, TOAST_TYPE } from '../../utils/toastHelper';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginRegisterClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
  };

  const logout = async () => {
    try {
      const results = await dispatch(logoutUser()).unwrap();
      if (results.success) {
        toastMessage('Logged out!', TOAST_TYPE.SUCCESS);
      }
    } catch (error) {
      toastMessage(error, TOAST_TYPE.ERROR);
    }
  };

  return (
    <header className='hidden relative w-full mx-auto px-2 pt-6 justify-end md:flex lg:w-header'>
      <div className='flex items-center'>
        <img
          className='w-profile h-profile rounded-full mr-4'
          src={`${
            user?.image || '/assets/user-images/image-default-profile-pic.jpeg'
          }`}
          alt=''
        />
        {
          <p
            className='text-lg text-darkBlue1 cursor-pointer hover:underline'
            onClick={onLoginRegisterClick}
          >
            {user ? user.firstname + ' ' + user.lastname : 'Login/Register'}
          </p>
        }
        {user && (
          <div className='ml-4'>
            <Button text='Logout' color={ButtonColors.BLUE} callback={logout} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
