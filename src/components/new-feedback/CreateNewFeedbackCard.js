import { Button, DropdownListInput, FeedbackFormTitleDesc } from '../common';
import { feedbackCategories } from '../../data/selection';
import { ButtonColors } from '../../data/colors';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSuggestion } from '../../features/suggestions/suggestionSlice';
import { useNavigate } from 'react-router-dom';
import { TOAST_TYPE, toastMessage } from '../../utils/toastHelper';

const CreateNewFeedbackCard = () => {
  const { buttonDisabled } = useSelector((state) => state.suggestions);
  const [input, setInput] = useState({ title: '', details: '' });
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addFeedback = async (e) => {
    e.preventDefault();
    if (input.details.length <= 0) {
      setIsError(true);
      return;
    }

    let temp = {
      title: input.title,
      desc: input.details,
      category: feedbackCategories[categoryIndex].toLowerCase(),
    };

    try {
      const result = await dispatch(createSuggestion(temp)).unwrap();
      if (result.success) {
        toastMessage('Suggestion submitted!', TOAST_TYPE.SUCCESS);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toastMessage('Failed to create suggestion', TOAST_TYPE.ERROR);
    }
  };
  const cancel = (e) => {
    e.preventDefault();
  };

  const onCategoryChange = (index) => {
    setCategoryIndex(index);
  };

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'details') {
      setIsError(false);
    }

    let temp = { ...input, [name]: value };
    setInput(temp);
  };

  return (
    <div className='relative w-full px-6 pt-11 pb-6 rounded-card bg-white flex flex-col md:pt-13 md:px-10 md:pb-10'>
      {/* Plus image */}

      <img
        className='absolute -top-5 w-[40px] md:w-14 md:h-14 md:-top-7'
        src='/assets/shared/icon-new-feedback.svg'
        alt=''
      />

      <h1 className='text-h3 text-darkBlue1 font-bold spacing-h1 md:text-h1'>
        Create New Feedback
      </h1>
      <form className='pt-6 flex flex-col md:pt-10'>
        {/* Feedback title */}
        <div className='flex flex-col'>
          <FeedbackFormTitleDesc
            title='Feedback Title'
            desc='Add a short, descriptive headline'
          />
          <input
            className='h-12 px-4 mt-4 mb-6 rounded-textarea text-sm bg-lightGrey2 md:text-md'
            type='text'
            value={input.title}
            name='title'
            onChange={onInputChange}
          />
        </div>
        {/* Category */}
        <div className='flex flex-col'>
          <FeedbackFormTitleDesc
            title='Category'
            desc='Choose a category for your feedback'
          />
          <div className='w-full mt-4 mb-6'>
            <DropdownListInput
              options={feedbackCategories}
              chosenIndex={categoryIndex}
              onOptionChanged={onCategoryChange}
            />
          </div>
        </div>
        {/* Feedback details */}
        <div className='flex flex-col'>
          <FeedbackFormTitleDesc
            title='Feedback Details'
            desc='Include any specific comments on what should be improved, added,
            etc.'
          />
          <textarea
            className={`resize-none h-newFeedbackTextarea px-4 py-3 mt-4 mb-2 rounded-textarea text-sm bg-lightGrey2${
              isError ? ' border-[1px] border-red' : ''
            } md:text-md`}
            value={input.details}
            type='text'
            name='details'
            onChange={onInputChange}
          />
          {
            <p
              className={`text-h4 text-red select-none ${
                isError ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Cannot be empty
            </p>
          }
        </div>
        <div className='w-full flex flex-col-reverse space-y-reverse space-y-4 pt-4 md:flex-row md:justify-end md:space-x-4 md:space-y-0'>
          <Button
            text='Cancel'
            color={ButtonColors.DARK_BLUE}
            callback={cancel}
            isDisabled={buttonDisabled}
          />
          <Button
            text='Add Feedback'
            color={ButtonColors.PINK}
            callback={addFeedback}
            isDisabled={buttonDisabled}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateNewFeedbackCard;
