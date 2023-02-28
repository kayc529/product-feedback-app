const InputRow = ({
  text,
  name,
  value,
  onInputChange,
  maxLength = 50,
  inputType = 'text',
  placeholder = '',
  isError = false,
  errorMsg = 'Cannot leave blank',
}) => {
  return (
    <div className='flex flex-col'>
      <p className='text-darkBlue1 capitalize pb-1 lg:text-lg'>{text}</p>
      <input
        className={`h-10 w-loginInput px-4 rounded-textarea bg-lightGrey1 outline-none border-[1px] ${
          isError ? 'border-red' : 'border-transparent'
        }`}
        value={value}
        type={inputType}
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
    </div>
  );
};

export default InputRow;
