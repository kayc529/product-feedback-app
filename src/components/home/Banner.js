import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toggleMobileSidebar } from '../../features/suggestions/suggestionSlice';

const Banner = () => {
  const { isMobileSidebarOpen } = useSelector((state) => state.suggestions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const openMobileSideBar = () => {
    dispatch(toggleMobileSidebar());
  };

  const goToHome = () => {
    setSearchParams({});
  };

  return (
    <div
      className='relative h-bannerMobile px-6 bg-bannerMobile bg-cover flex flex-row justify-between items-center overflow-hidden cursor-pointer md:py-6 md:h-homeSideBarCard md:w-bannerTablet md:rounded-card md:bg-bannerTablet md:flex-col md:justify-end md:items-start lg:w-banner lg:h-[137px] lg:bg-banner'
      onClick={goToHome}
    >
      <div className='hidden absolute top-0 left-0 z-10 w-full h-full bg-shade opacity-0 transform duration-100 ease-in md:block md:hover:opacity-100'></div>
      <div className='flex flex-col'>
        <h2 className='z-20 text-h2 leading-h2 text-white font-bold tracking-h2'>
          Frontend Mentor
        </h2>
        <p className='text-md text-white opacity-75'>Feedback Board</p>
      </div>
      <img
        className='block md:hidden'
        src={`/assets/shared/mobile/icon-${
          isMobileSidebarOpen ? 'close' : 'hamburger'
        }.svg`}
        alt=''
        onClick={openMobileSideBar}
      />
    </div>
  );
};

export default Banner;
