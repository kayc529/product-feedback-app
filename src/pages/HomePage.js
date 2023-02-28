import { useEffect } from 'react';
import { SideBar, SuggestionBoard } from '../components/home';
import { useDispatch } from 'react-redux';
import { getAllSuggestions } from '../features/suggestions/suggestionSlice';
import { useSearchParams } from 'react-router-dom';
import { getQueryString } from '../utils/queryStringHelper';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let queryStr = getQueryString(searchParams);
    dispatch(getAllSuggestions(queryStr));
  }, [searchParams]);

  return (
    <div
      id='homePage'
      className='relative w-full pb-pageTopTablet mx-auto flex flex-col justify-center md:py-pageTopTablet md:space-y-10 md:items-center lg:py-pageTop lg:space-x-[30px] lg:space-y-0 lg:flex-row lg:items-start xl:max-w-homepage'
    >
      <SideBar />
      <SuggestionBoard />
    </div>
  );
};

export default HomePage;
