import { ButtonColors } from '../../data/colors';
import { feedbackCategories, updateStatuses } from '../../data/selection';
import { Button, DropdownListInput, FeedbackFormTitleDesc } from '../common';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSuggestion,
  updateSuggestion,
} from '../../features/suggestions/suggestionSlice';
import { useNavigate } from 'react-router-dom';
import { TOAST_TYPE, toastMessage } from '../../utils/toastHelper';

const EditFeedbackCard = () => {
  const getStatusIndex = () => {
    let index = 0;
    if (currentSuggestion?.status) {
      index = updateStatuses.indexOf(currentSuggestion.status);
    }

    return index === -1 ? 0 : index;
  };

  const getCategoryIndex = () => {
    let index = 0;
    if (currentSuggestion?.category) {
      index = feedbackCategories.indexOf(currentSuggestion.category);
    }

    return index === -1 ? 0 : index;
  };

  const { currentSuggestion, buttonDisabled } = useSelector(
    (state) => state.suggestions
  );
  const [input, setInput] = useState({ title: '', details: '' });
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setInput({
      title: currentSuggestion?.title || '',
      details: currentSuggestion?.desc,
    });
    setCategoryIndex(getCategoryIndex());
    setStatusIndex(getStatusIndex());
  }, [currentSuggestion]);

  const saveChanges = async (e) => {
    e.preventDefault();
    if (input.details.length <= 0) {
      setIsError(true);
      return;
    }

    try {
      let updatedSuggestion = {
        _id: currentSuggestion._id,
        title: input.title,
        desc: input.details,
        category: feedbackCategories[categoryIndex].toLowerCase(),
        status: updateStatuses[statusIndex].toLowerCase(),
      };
      const result = await dispatch(
        updateSuggestion(updatedSuggestion)
      ).unwrap();
      if (result.success) {
        toastMessage('Suggestion updated!', TOAST_TYPE.SUCCESS);
      }
    } catch (error) {
      console.log(error);
      toastMessage('Failed to update suggestion', TOAST_TYPE.ERROR);
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const deleteFeedback = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        deleteSuggestion(currentSuggestion._id)
      ).unwrap();
      if (result.success) {
        toastMessage('Suggestion deleted!', TOAST_TYPE.SUCCESS);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toastMessage('Failed to delete suggestion', TOAST_TYPE.ERROR);
    }
  };

  const onCategoryChange = (index) => {
    setCategoryIndex(index);
  };

  const onStatusChange = (index) => {
    setStatusIndex(index);
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
    <div className='relative w-full px-10 pt-14 pb-10 mt-16 rounded-card bg-white'>
      {/* Edit image */}
      <img
        className='absolute -top-7 w-14 h-14'
        src='/assets/shared/icon-edit-feedback.svg'
        alt=''
      />
      <h1 className='text-h3 text-darkBlue1 font-bold spacing-h1 md:text-h1'>
        Editing '{currentSuggestion?.title}'
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
        {/* Update Status */}
        <div className='flex flex-col'>
          <FeedbackFormTitleDesc
            title='Update Status'
            desc='Change feature state'
          />
          <div className='w-full mt-4 mb-6'>
            <DropdownListInput
              options={updateStatuses}
              chosenIndex={statusIndex}
              onOptionChanged={onStatusChange}
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
        <div className='w-full pt-4 flex flex-col-reverse space-y-4 space-y-reverse md:flex-row md:justify-between md:space-y-0'>
          <Button
            text='Delete'
            color={ButtonColors.RED}
            callback={deleteFeedback}
            isDisabled={buttonDisabled}
          />
          <div className='flex flex-col-reverse space-y-4 space-y-reverse md:flex-row md:space-x-[16px] md:space-y-0'>
            <Button
              text='Cancel'
              color={ButtonColors.DARK_BLUE}
              callback={cancel}
              isDisabled={buttonDisabled}
            />
            <Button
              text='Save Changes'
              color={ButtonColors.PINK}
              callback={saveChanges}
              isDisabled={buttonDisabled}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditFeedbackCard;
