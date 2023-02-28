import SuggestionBoardTopBar from './SuggestionBoardTopBar';
import SuggestionCard from './SuggestionCard';
import { useSelector } from 'react-redux';
import NoFeedback from './NoFeedback';
import { Pagination } from '../common';
import { useSearchParams } from 'react-router-dom';
import { getSearchParamsObject } from '../../utils/queryStringHelper';
import Loading from './Loading';

const SuggestionBoard = () => {
  const { isLoading, suggestions, numOfPages, currentPage } = useSelector(
    (state) => state.suggestions
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (pageNum) => {
    let tempSearchParams = getSearchParamsObject(searchParams);
    tempSearchParams.p = pageNum;
    setSearchParams(tempSearchParams);
  };

  return (
    <section className='w-full flex flex-col my-auto md:w-suggestionBoardTablet lg:max-w-suggestionBoard'>
      <SuggestionBoardTopBar />
      {isLoading && (
        <div className='w-full mt-5'>
          <Loading />
        </div>
      )}
      {!isLoading && suggestions.length === 0 ? <NoFeedback /> : <></>}
      {!isLoading && suggestions.length > 0 ? (
        <>
          <div className='w-suggestionBoardMobile pt-8 mx-auto flex flex-col md:w-full md:pt-6'>
            {suggestions.map((suggestion, index) => {
              return (
                <SuggestionCard key={suggestion._id} suggestion={suggestion} />
              );
            })}
          </div>
          <div className='mx-auto pt-6'>
            <Pagination
              onPageChange={onPageChange}
              numOfPages={numOfPages}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default SuggestionBoard;
