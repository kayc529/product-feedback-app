const FeedbackFormTitleDesc = ({ title, desc }) => {
  return (
    <div className='w-full flex flex-col'>
      <h4 className='text-sm text-darkBlue1 font-bold md:text-h4'>{title}</h4>
      <p className='text-sm text-greyishBlue md:text-h4'>{desc}</p>
    </div>
  );
};

export default FeedbackFormTitleDesc;
