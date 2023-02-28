import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeMobileSidebar } from '../../features/suggestions/suggestionSlice';
const Roadmap = () => {
  const { roadmapCount } = useSelector((state) => state.suggestions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToRoadmap = () => {
    dispatch(closeMobileSidebar());
    navigate('/roadmap');
  };

  return (
    <div className='w-bannerTablet h-homeSideBarCard rounded-card bg-white pt-6 px-6 lg:w-banner'>
      <div className='flex justify-between items-center'>
        <h3 className='text-h3 text-darkBlue2 font-bold'>Roadmap</h3>
        <p
          className='text-sm text-blue hover:text-greyishBlue underline cursor-pointer'
          onClick={goToRoadmap}
        >
          View
        </p>
      </div>

      <div className='flex flex-col space-y-2 pt-6'>
        {/* Planned */}
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <span className='w-2 h-2 bg-orange rounded-full' />
            <p className='text-lg text-greyishBlue pl-4'>Planned</p>
          </div>
          <p className='text-lg text-darkBlue1 font-bold'>
            {roadmapCount ? roadmapCount.planned : 0}
          </p>
        </div>
        {/* In-progress */}
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <span className='w-2 h-2 bg-purple rounded-full' />
            <p className='text-lg text-greyishBlue pl-4'>In-Progress</p>
          </div>
          <p className='text-lg text-darkBlue1 font-bold'>
            {roadmapCount ? roadmapCount.inProgress : 0}
          </p>
        </div>
        {/* Live */}
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <span className='w-2 h-2 bg-lightBlue rounded-full' />
            <p className='text-lg text-greyishBlue pl-4'>Live</p>
          </div>
          <p className='text-lg text-darkBlue1 font-bold'>
            {roadmapCount ? roadmapCount.live : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
