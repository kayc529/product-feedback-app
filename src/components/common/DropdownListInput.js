import { useState } from 'react';

const DropdownListInput = ({
  onOptionChanged,
  chosenIndex = 0,
  options = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`relative w-full h-dropdownList px-4 rounded-dropdownList bg-lightGrey2 ${
        isOpen ? 'border-1 border-blue' : 'border-0'
      } flex items-center justify-between cursor-pointer md:px-6`}
      onClick={toggle}
    >
      <p className='text-sm capitalize text-greyishBlue md:text-md'>
        {options[chosenIndex]}
      </p>
      <img
        className=''
        src={`/assets/shared/icon-arrow-${isOpen ? 'up' : 'down'}.svg`}
        alt=''
      />

      {/* Dropdown list */}
      <ul
        className={`${
          isOpen ? 'opacity-100 translate-y-[30px] h-auto' : 'opacity-0 h-[0px]'
        } absolute z-10 w-full top-[34px] left-[0px] rounded-dropdownList bg-white drop-shadow-dropdownList flex flex-col ease-in duration-100`}
      >
        {isOpen &&
          options.map((option, index) => {
            return (
              <li
                className='border-b-[1px] border-veryLightBlue last:border-0'
                key={index}
                onClick={() => onOptionChanged(index)}
              >
                <div className='py-3 px-6 flex justify-between items-center cursor-pointer'>
                  <p className='w-full capitalize text-md text-greyishBlue hover:text-purple'>
                    {option}
                  </p>
                  {index === chosenIndex && (
                    <img src='/assets/shared/icon-check.svg' alt='' />
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DropdownListInput;
