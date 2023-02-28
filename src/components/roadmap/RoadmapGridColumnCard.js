import { useNavigate } from 'react-router-dom';
import { CommentsCount, Tag, UpvoteButton } from '../common';

const RoadmapGridColumnCard = ({
  status,
  suggestion,
  border,
  color = 'orange',
}) => {
  const navigate = useNavigate();
  const goToSuggestionDetails = () => {
    navigate(`/suggestion/${suggestion._id}`);
  };

  return (
    <div
      className={`w-full p-5 ${border} rounded-card bg-white flex flex-col items-start lg:h-roadmapGridColumnCard lg:p-8`}
      key={suggestion?._id}
    >
      <div className='flex items-center'>
        <div className={`w-2 h-2 bg-${color} rounded-full`}></div>
        <p className='text-sm text-greyishBlue capitalize pl-4 lg:text-lg'>
          {status}
        </p>
      </div>
      <h3
        className='w-full text-sm text-darkBlue1 overflow-hidden text-ellipsis whitespace-nowrap font-bold pt-2 pb-1 cursor-pointer hover:text-blue lg:text-h3'
        onClick={goToSuggestionDetails}
      >
        {suggestion?.title}
      </h3>
      <p className='w-full mb-2 text-sm text-greyishBlue two-lines lg:text-lg lg:leading-lg'>
        {suggestion?.desc}
      </p>
      <Tag keyword={suggestion?.category} />
      <div className='w-full flex justify-between'>
        <UpvoteButton horizontal={true} upvotes={suggestion?.upvotes} />
        <CommentsCount commentCount={suggestion?.comments?.length} />
      </div>
    </div>
  );
};

export default RoadmapGridColumnCard;
