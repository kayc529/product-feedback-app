import { Button } from '../common';
import { ButtonColors } from '../../data/colors';
import { sortingOptions } from '../../data/selection';
import SortingDropdownList from './SortingDropdownList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toastMessage } from '../../utils/toastHelper';

const SuggestionBoardTopBar = () => {
  const { count } = useSelector((state) => state.suggestions);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const goToAddSuggestion = () => {
    if (user) {
      navigate('/newfeedback');
      return;
    }

    toastMessage('You must login to create a feedback');
    navigate('/login?return_to=/newfeedback');
  };

  return (
    <div className='w-full h-suggestionBoardTopBar bg-darkBlue1 flex justify-between items-center p-card md:rounded-card'>
      <div className='flex items-center'>
        <img
          className='hidden md:block'
          src='assets/suggestions/icon-suggestions.svg'
          alt=''
        />
        <h3 className='hidden md:block text-h3 font-bold text-white pl-4 pr-9'>
          {count} suggestions
        </h3>
        <SortingDropdownList options={sortingOptions} />
      </div>
      <Button
        text='+ Add Feedback'
        color={ButtonColors.PINK}
        callback={goToAddSuggestion}
      />
    </div>
  );
};

export default SuggestionBoardTopBar;
