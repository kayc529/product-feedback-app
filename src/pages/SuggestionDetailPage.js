import CommentsContainer from '../components/feedback-details/CommentsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, GoBackButton, Loader } from '../components/common';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonColors } from '../data/colors';
import { SuggestionCard } from '../components/home';
import { AddComment } from '../components/feedback-details';
import { useEffect, useState } from 'react';
import {
  getSuggestion,
  createComment,
} from '../features/suggestions/suggestionSlice';
import { toastMessage, TOAST_TYPE } from '../utils/toastHelper';

const SuggestionDetailPage = () => {
  const { isLoading, currentSuggestion } = useSelector(
    (state) => state.suggestions
  );
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getCurrentSuggestion();
  }, []);

  const getCurrentSuggestion = async () => {
    setIsError(false);
    try {
      const result = await dispatch(getSuggestion(id)).unwrap();
      if (!result.suggestion) {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToEditFeedbackPage = () => {
    navigate(`/editfeedback/${currentSuggestion?._id}`);
  };

  const onCommentChange = (newComment) => {
    setComment(newComment);
  };

  const postComment = async (commentText) => {
    let comment = { content: commentText };
    try {
      const result = await dispatch(
        createComment({ suggestionId: id, comment })
      ).unwrap();
      if (result.success) {
        toastMessage('Comment submitted!', TOAST_TYPE.SUCCESS);
        setComment('');
      }
    } catch (error) {
      console.log(error);
      toastMessage('Failed to submit comment', TOAST_TYPE.ERROR);
    }
  };

  const isAbleToEdit = () => {
    return (
      user &&
      (user.userId === currentSuggestion?.createdBy || user.role === 'admin')
    );
  };

  if (isError) {
    return (
      <div className='w-suggestionDetailPageMobile mx-auto py-10 flex flex-col md:w-suggestionDetailPageTablet md:py-pageTop lg:w-suggestionDetailPage'>
        <div className='w-full h-noFeedbackMobile rounded-card bg-white flex flex-col items-center justify-center md:h-noFeedback'>
          <img
            className='w-24 h-24 md:w-32 md:h-32'
            src='/assets/suggestions/illustration-empty.svg'
            alt=''
          />
          <h1 className='py-4 text-h2 text-darkBlue1 md:text-h1'>
            Oops, something went wrong!
          </h1>
          <Button text='Refresh' callback={getCurrentSuggestion} />
          <p
            className='pt-2 text-md text-blue underline cursor-pointer md:text-lg'
            onClick={goBack}
          >
            Go back
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-suggestionDetailPageMobile mx-auto py-6 flex flex-col md:w-suggestionDetailPageTablet md:py-pageTop lg:w-suggestionDetailPage'>
      {/* Go back + button */}
      <div className='w-full h-button flex justify-between items-center'>
        <GoBackButton callback={goBack} />
        {isAbleToEdit() && (
          <Button
            text='Edit Feedback'
            color={ButtonColors.BLUE}
            callback={goToEditFeedbackPage}
          />
        )}
      </div>
      {/* Current Suggestion */}
      {isLoading ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <>
          <SuggestionCard
            suggestion={currentSuggestion || {}}
            disableClicking={true}
            showFull={true}
          />

          {/* Comments + replies */}
          {currentSuggestion?.comments?.length > 0 && (
            <CommentsContainer comments={currentSuggestion.comments} />
          )}

          {/* Add comment section */}
          <AddComment
            onPostComment={postComment}
            value={comment}
            onValueChange={onCommentChange}
          />
        </>
      )}
    </div>
  );
};

export default SuggestionDetailPage;
