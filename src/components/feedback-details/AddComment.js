import { useEffect, useState } from 'react';
import { ButtonColors } from '../../data/colors';
import { Button } from '../common';
import { MAX_COMMENT_LENGTH } from '../../data/constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddComment = ({ value, onValueChange, onPostComment }) => {
  const { buttonDisabled } = useSelector((state) => state.suggestions);
  const { user } = useSelector((state) => state.user);
  const [isError, setIsError] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(MAX_COMMENT_LENGTH);
  const navigate = useNavigate();

  useEffect(() => {
    setCharactersLeft(MAX_COMMENT_LENGTH - value.length);
  }, [value]);

  const onInput = (e) => {
    let input = e.target.value;

    setIsError(false);

    if (input.length <= MAX_COMMENT_LENGTH) {
      onValueChange(input);
    }
  };

  const postComment = (e) => {
    e.preventDefault();

    if (value.length === 0) {
      setIsError(true);
      return;
    }

    if (onPostComment) {
      onPostComment(value);
    }
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <form className='w-full bg-white rounded-card mt-6 p-6 flex flex-col md:px-8'>
      <h3 className='text-h3 text-darkBlue1 font-bold'>Add Comment</h3>
      {/* Textarea */}
      <div className='relative w-full mt-6'>
        <textarea
          className={`${
            isError ? 'border-[1px] border-red ' : ''
          }w-full h-commentTextarea rounded-textarea resize-none p-4 text-sm bg-lightGrey2 md:text-md md:px-6`}
          placeholder='Type your comment here'
          onChange={onInput}
          value={value}
        ></textarea>
        {user ? (
          <></>
        ) : (
          <div className='absolute top-0 left-0 w-full h-commentTextarea rounded-textarea bg-shade flex items-center justify-center'>
            <p
              className='text-h2 text-white font-bold cursor-pointer hover:underline'
              onClick={goToLoginPage}
            >
              Please login to comment
            </p>
          </div>
        )}
      </div>
      <p
        className={`text-sm ${isError ? 'text-red' : 'text-transparent'} mt-1`}
      >
        You cannot leave your comment blank
      </p>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-greyishBlue md:text-md'>
          {charactersLeft} Characters left
        </p>
        <Button
          text='Post Comment'
          color={ButtonColors.PINK}
          callback={postComment}
          isDisabled={buttonDisabled || !user}
        />
      </div>
    </form>
  );
};

export default AddComment;
