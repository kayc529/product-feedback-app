import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonColors } from '../../data/colors';
import { toastMessage, TOAST_TYPE } from '../../utils/toastHelper';
import { Button, GoBackButton } from '../common';
const RoadmapTopBar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const addNewFeedback = () => {
    if (!user) {
      toastMessage('You must login to create a suggestion', TOAST_TYPE.DEFAULT);
      navigate('/login?return_to=/newfeedback');
      return;
    }
    navigate('/newfeedback');
  };
  return (
    <div className='w-full h-roadmapTopBarMobile px-6 bg-darkBlue1 flex justify-between items-center md:w-full md:h-roadmapTopBar md:px-8 md:rounded-card lg:px-10'>
      <div className='flex flex-col'>
        <GoBackButton darkMode={true} />
        <h1 className='text-h1 text-white font-bold'>Roadmap</h1>
      </div>
      <Button
        text='+ Add Feedback'
        color={ButtonColors.PINK}
        callback={addNewFeedback}
      />
    </div>
  );
};

export default RoadmapTopBar;
