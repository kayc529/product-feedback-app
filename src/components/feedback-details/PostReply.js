import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonColors } from '../../data/colors';
import { Button } from '../common';

const PostReply = ({ reply, onReplyChange, postReply }) => {
  const { user } = useSelector((state) => state.user);
  const { buttonDisabled } = useSelector((state) => state.suggestions);
  const navigate = useNavigate();
  const post = () => {
    if (reply.length === 0) {
      return;
    }

    postReply(reply);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='w-full flex space-x-4'>
      <div className='relative w-full '>
        <textarea
          className='w-full h-replyTextarea px-4 py-2 text-sm resize-none bg-lightGrey2 rounded-textarea focus:border-[1px] focus:border-blue md:text-md md:px-6 md:py-4'
          placeholder='Type your reply here'
          onChange={(e) => onReplyChange(e.target.value)}
          value={reply}
        ></textarea>
        {!user && (
          <div className='absolute z-10 top-0 left-0 w-full h-replyTextarea rounded-textarea bg-shade flex items-center justify-center'>
            <p
              className='text-h2 text-white font-bold cursor-pointer hover:underline'
              onClick={goToLogin}
            >
              Please login to reply
            </p>
          </div>
        )}
      </div>
      <div className='flex flex-col shrink-0'>
        <Button
          text='Post Reply'
          color={ButtonColors.PINK}
          callback={post}
          isDisabled={buttonDisabled || !user}
        />
      </div>
    </div>
  );
};

export default PostReply;
