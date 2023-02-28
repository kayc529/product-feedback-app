import { Tag } from '../common';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchParamsObject } from '../../utils/queryStringHelper';

const TagsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.suggestions);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const c = searchParams.get('c');
    if (c) {
      let categories = c.split(',');
      setSelectedCategories(categories);
    }
  }, [searchParams]);

  const isCategorySelected = (category) => {
    if (category.toLowerCase() === 'all') {
      return selectedCategories.length === 0;
    }
    return selectedCategories.includes(category);
  };

  const onTagClick = (tag) => {
    let temp;
    //if the all tag is clicked -> remove all selected categories
    if (tag.toLowerCase() === 'all') {
      temp = [];
    }
    //if an unselected tag is clicked -> add the tag to the selected categories
    else if (!selectedCategories.includes(tag)) {
      temp = [...selectedCategories];
      temp.push(tag);
    }
    //if a selected tag is clicked -> remove the tag from the selected categories
    else if (selectedCategories.includes(tag)) {
      temp = [...selectedCategories];
      temp = temp.filter((t) => t !== tag);
    }

    setSelectedCategories(temp);

    filterSuggestions(temp);
  };

  const filterSuggestions = (temp) => {
    let tempSearchParamsObj = getSearchParamsObject(searchParams);
    if (temp.length === 0) {
      delete tempSearchParamsObj.c;
    } else {
      let cStr = temp.join(',');
      tempSearchParamsObj.c = cStr;
    }
    setSearchParams(tempSearchParamsObj);
  };

  return (
    <div className='w-bannerTablet h-homeSideBarCard flex justify-start items-start rounded-card bg-white px-6 pt-6 lg:w-banner'>
      <div className='flex flex-wrap'>
        {categories.map((category, index) => {
          return (
            <Tag
              key={index}
              keyword={category}
              onClick={onTagClick}
              clickable={true}
              selected={isCategorySelected(category)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TagsContainer;
