import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CommentsCount, Tag, UpvoteButton } from '../common';
import { toastMessage, TOAST_TYPE } from '../../utils/toastHelper';
import { upvoteSuggestion } from '../../features/suggestions/suggestionSlice';
import { useEffect, useState } from 'react';

const SuggestionCard = ({
  suggestion,
  disableClicking = false,
  showFull = false,
}) => {
  const { user } = useSelector((state) => state.user);
  const {
    _id: id,
    title,
    category,
    desc,
    upvotes,
    comments,
    upvotedBy,
  } = suggestion;
  const [isUpvoted, setIsUpvoted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsUpvoted(user && upvotedBy?.includes(user.userId));
  }, [suggestion]);

  const onCardClicked = (e) => {
    if (!disableClicking) {
      navigate(`/suggestion/${id}`);
    }
  };

  const onUpvoted = () => {
    if (!user) {
      toastMessage('You must login to upvote a suggestion', TOAST_TYPE.DEFAULT);
      return;
    }
    dispatch(upvoteSuggestion(id));
  };

  const getContentStyle = () => {
    return showFull ? '' : 'h-suggestionCardMobile md:h-suggestionCard ';
  };

  return (
    <div
      className={`${getContentStyle()}w-full max-w-suggestionBoard p-6 md:px-8 md:py-7 mt-5 first:mt-0 rounded-card flex flex-col items-center bg-white${
        disableClicking
          ? ''
          : ' cursor-pointer duration-100 ease-in-out hover:-translate-y-1 hover:drop-shadow-lg'
      } md:flex-row`}
    >
      {/* Content */}
      <div className='w-full flex items-center justify-between'>
        {/* Upvote button */}
        <div className='hidden md:block'>
          <UpvoteButton
            upvotes={upvotes}
            onButtonClick={onUpvoted}
            isUpvoted={isUpvoted}
          />
        </div>
        {/* Title and description and tag */}
        <div
          className='w-4/5 flex flex-col items-start'
          onClick={onCardClicked}
        >
          <h3
            className={`w-full text-h3 ${
              showFull ? '' : 'truncate '
            }leading-h3 text-darkBlue1 font-bold pb-1`}
          >
            {title}
          </h3>
          <p
            className={`w-full text-lg ${
              showFull ? '' : 'two-lines '
            }text-greyishBlue mb-2`}
          >
            {desc}
          </p>
          <Tag keyword={category} withMargin={false} />
        </div>
        {/* Comment counts */}
        <div className='hidden md:flex'>
          <CommentsCount commentCount={comments?.length} />
        </div>
      </div>

      {/* Mobile only*/}
      <div className='w-full flex justify-between pt-3 md:hidden'>
        <UpvoteButton
          upvotes={upvotes}
          onButtonClick={onUpvoted}
          horizontal={true}
          isUpvoted={isUpvoted}
        />
        <CommentsCount commentCount={comments?.length} />
      </div>
    </div>
  );
};

export default SuggestionCard;
