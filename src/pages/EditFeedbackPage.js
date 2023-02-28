import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoBackButton } from '../components/common';
import { EditFeedbackCard } from '../components/edit-feedback';
import { getSuggestion } from '../features/suggestions/suggestionSlice';

const EditFeedbackPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuggestion(id));
  }, []);

  return (
    <div className=' w-newFeedbackMobile mx-auto py-9 flex flex-col items-start md:w-newFeedback md:py-pageTop'>
      <GoBackButton />
      <EditFeedbackCard />
    </div>
  );
};

export default EditFeedbackPage;
