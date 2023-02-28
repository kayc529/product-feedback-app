import Banner from './Banner';
import TagsContainer from './TagsContainer';
import Roadmap from './Roadmap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileSidebar } from '../../features/suggestions/suggestionSlice';
import { logoutUser } from '../../features/user/userSlice';
import { Button } from '../common';
import { useNavigate } from 'react-router-dom';
import { toastMessage, TOAST_TYPE } from '../../utils/toastHelper';

const SideBar = () => {
  const { isMobileSidebarOpen } = useSelector((state) => state.suggestions);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    dispatch(toggleMobileSidebar());
  };

  const goToLogin = () => {
    if (!user) {
      toggleSidebar();
      navigate('/login');
    }
  };

  const logout = async () => {
    try {
      const results = await dispatch(logoutUser()).unwrap();
      if (results.success) {
        toastMessage('Logged out!', TOAST_TYPE.SUCCESS);
      }
    } catch (error) {}
  };

  return (
    <>
      {/* Desktop and tablet */}
      <aside className='hidden md:flex md:space-x-[10px] md:flex-row lg:space-y-6 lg:space-x-0 lg:flex-col'>
        <Banner />
        <TagsContainer />
        <Roadmap />
      </aside>

      {/* Mobile */}
      <aside className='sticky top-0 z-10 w-full flex flex-col bg-shade md:hidden'>
        <Banner />
      </aside>
      <div
        className={`${
          isMobileSidebarOpen ? 'fixed' : 'hidden'
        } top-0 w-full h-screen bg-shade md:hidden`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`${
          isMobileSidebarOpen ? '' : 'translate-x-[300px]'
        } fixed z-10 top-[72px] right-0 w-sidebarMobile h-full pt-6 bg-lightGrey1 space-y-6 flex flex-col items-center transition ease-in duration-300 md:hidden`}
      >
        <div className='flex items-center'>
          <img
            className='w-10 h-10 rounded-full'
            src={`${
              user?.image ||
              '/assets/user-images/image-default-profile-pic.jpeg'
            }`}
            alt=''
          />
          <p
            className='pl-2 text-md cursor-pointer hover:underline'
            onClick={goToLogin}
          >
            {user ? user.firstname + ' ' + user.lastname : 'Login/Register'}
          </p>
        </div>
        <TagsContainer />
        <Roadmap />
        {user && <Button text='logout' callback={logout} />}
      </aside>
    </>
  );
};

export default SideBar;
