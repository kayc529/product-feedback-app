import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileSidebar } from '../../features/suggestions/suggestionSlice';

const Banner = () => {
  const { isMobileSidebarOpen } = useSelector((state) => state.suggestions);
  const dispatch = useDispatch();

  const openMobileSideBar = () => {
    dispatch(toggleMobileSidebar());
  };

  return (
    <div className='h-bannerMobile px-6 bg-bannerMobile bg-cover flex flex-row justify-between items-center md:py-6 md:h-homeSideBarCard md:w-bannerTablet md:rounded-card md:bg-bannerTablet md:flex-col md:justify-end md:items-start lg:w-banner lg:h-[137px] lg:bg-banner'>
      <div className='flex flex-col'>
        <h2 className='text-h2 leading-h2 text-white font-bold tracking-h2'>
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
