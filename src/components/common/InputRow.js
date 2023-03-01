import { useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const InputRow = ({
  text,
  name,
  value,
  onInputChange,
  maxLength = 50,
  inputType = 'text',
  placeholder = '',
  isPasswordField = false,
  isError = false,
  errorMsg = 'Cannot leave blank',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState(inputType);

  const toggleEye = () => {
    setShowPassword((prev) => !prev);
    setType(type === 'text' ? 'password' : 'text');
  };

  const getEyeIcon = () => {
    return showPassword ? (
      <BsEye
        className='absolute z-10 top-10 right-3 w-5 h-5'
        onClick={toggleEye}
      />
    ) : (
      <BsEyeSlash
        className='absolute z-10 top-10 right-3 w-5 h-5'
        onClick={toggleEye}
      />
    );
  };
  return (
    <div className='relative flex flex-col'>
      <p className='text-darkBlue1 capitalize pb-1 lg:text-lg'>{text}</p>
      <input
        className={`h-10 w-loginInput px-4 rounded-textarea bg-lightGrey1 outline-none border-[1px] ${
          isError ? 'border-red' : 'border-transparent'
        }`}
        value={value}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        name={name}
        onChange={(e) => onInputChange(name, e.target.value)}
      />
      <p
        className={`h-4 text-sm text-red pl-2  ${
          isError ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {errorMsg}
      </p>
      {isPasswordField && getEyeIcon()}
    </div>
  );
};

export default InputRow;
