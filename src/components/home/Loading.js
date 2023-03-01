import { LoadingSuggestionCard } from '../common';
import { ITEMS_PER_PAGE } from '../../data/constants';
const Loading = () => {
  return (
    <div className='w-full space-y-5 flex flex-col items-center'>
      {Array(ITEMS_PER_PAGE)
        .fill(0)
        .map((item, index) => {
          return <LoadingSuggestionCard key={index} />;
        })}
    </div>
  );
};

export default Loading;
