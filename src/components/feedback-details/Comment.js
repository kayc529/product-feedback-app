import { useState } from 'react';
import UsernameRow from './UsernameRow';
import PostReply from './PostReply';
import { useDispatch } from 'react-redux';
import { createReply } from '../../features/suggestions/suggestionSlice';
import { toastMessage, TOAST_TYPE } from '../../utils/toastHelper';

const Comment = ({ comment, isLastChild }) => {
  const { _id: id, content, user, replies } = comment;
  const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const dispatch = useDispatch();

  const onReplyClick = (username) => {
    setIsTextAreaOpen((prev) => !prev);
    setReplyTo(username);
  };

  const showsReplyOnTop = () => {
    return replies.length === 0 && isTextAreaOpen;
  };

  const showsReplyAtBottom = () => {
    return replies.length > 0 && isTextAreaOpen;
  };

  const leftBorder = () => {
    return ' md:border-l-[1px] border-veryLightBlue';
  };

  const onReplyChange = (newReply) => {
    setReply(newReply);
  };

  const postReply = async (replyText) => {
    if (!replyTo || replyTo.length === 0) {
      return;
    }

    const reply = { content: replyText, replyingTo: replyTo };

    try {
      const result = await dispatch(
        createReply({ commentId: id, reply })
      ).unwrap();
      if (result.success) {
        setIsTextAreaOpen(false);
        setReply('');
        setReplyTo('');
        toastMessage('Comment submitted!', TOAST_TYPE.SUCCESS);
      }
    } catch (error) {
      console.log(error);
      toastMessage('Failed to submit comment', TOAST_TYPE.SUCCESS);
    }
  };

  return (
    <div
      className={`w-full pt-6 pb-4 flex flex-col${
        isLastChild ? '' : ' border-b border-veryLightBlue md:pt-8 md:pb-6'
      }`}
    >
      <UsernameRow user={user} onReplyClick={onReplyClick} />
      <div className='flex flex-col mt-4 md:ml-[21px]'>
        <p
          className={`text-greyishBlue text-md pb-6 md:pl-[51px]${
            replies && replies.length > 0 ? leftBorder() : ''
          }`}
        >
          {content}
        </p>
        {showsReplyOnTop() && (
          <div className='w-full flex justify-end md:pl-[51px]'>
            <PostReply
              postReply={postReply}
              reply={reply}
              onReplyChange={onReplyChange}
            />
          </div>
        )}
        <ul className='w-full flex flex-col flex flex-col'>
          {replies && replies.length > 0 ? (
            replies.map((reply, index) => {
              return (
                <li key={index} className=' flex flex-col'>
                  <div className='pl-6 md:pl-[45px] flex border-l border-veryLightBlue'>
                    <UsernameRow
                      user={reply.user}
                      onReplyClick={onReplyClick}
                    />
                  </div>
                  <div
                    className={`${
                      index === replies.length - 1 ? 'border-0' : 'border-l'
                    } border-veryLightBlue md:pl-[45px]`}
                  >
                    <p className='text-greyishBlue text-md pt-4 pb-6 pl-6 md:pl-[72px]'>
                      <span className='text-purple font-bold pr-2'>
                        @{reply.replyingTo}
                      </span>
                      {reply.content}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
        <div className='pl-6 md:pl-[117px]'>
          {showsReplyAtBottom() && (
            <PostReply
              postReply={postReply}
              reply={reply}
              onReplyChange={onReplyChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
