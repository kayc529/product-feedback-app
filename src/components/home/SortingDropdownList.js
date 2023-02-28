import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchParamsObject } from '../../utils/queryStringHelper';

const SortingDropdownList = ({ options }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [chosenOptionIndex, setChoseOptionIndex] = useState(0);

  useEffect(() => {
    let sortingQuery = searchParams.get('s');
    if (sortingQuery) {
      let index = options.findIndex((option) => option.id === sortingQuery);
      index = index !== -1 ? index : 0;
      setChoseOptionIndex(index);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const changeSelection = (index) => {
    setIsOpen(false);
    setChoseOptionIndex(index);

    let tempSearchParamsObj = getSearchParamsObject(searchParams);
    tempSearchParamsObj.s = options[index].id;
    setSearchParams(tempSearchParamsObj);
  };

  return (
    <div className='relative'>
      <div className='flex items-center cursor-pointer' onClick={toggleMenu}>
        <h4 className='text-h4 text-lightGrey2 opacity-75'>Sort by :</h4>
        <h4 className='text-h4 text-white font-bold pl-1'>
          {options[chosenOptionIndex].title}
        </h4>
        <img
          className='pl-2'
          src={`assets/shared/icon-arrow-${isOpen ? 'up' : 'down'}-white.svg`}
          alt=''
        />
      </div>

      <ul
        className={`${
          isOpen ? 'opacity-100 translate-y-[30px]' : 'opacity-0'
        } absolute z-10 top-[30px] bg-white rounded-card drop-shadow-xl transition ease-in duration-300 `}
      >
        {isOpen &&
          options.map((option, index) => {
            return (
              <li
                key={option.id}
                className='px-6 w-dropdownList flex justify-between items-center border-veryLightBlue border-b last:border-0'
                onClick={() => changeSelection(index)}
              >
                <p className='text-lg text-greyishBlue py-3 cursor-pointer hover:text-purple'>
                  {option.title}
                </p>
                {index === chosenOptionIndex && (
                  <img src='assets/shared/icon-check.svg' alt='' />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SortingDropdownList;
