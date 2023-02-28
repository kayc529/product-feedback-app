const UpvoteButton = ({
  onButtonClick,
  horizontal = false,
  upvotes = 0,
  isUpvoted = false,
}) => {
  const getBgColor = () => {
    return isUpvoted ? 'bg-blue' : 'bg-lightGrey2 hover:bg-lightGrey1';
  };

  return (
    <div
      className={`z-10 ${
        horizontal ? 'w-upvoteBtnHorizontal py-2' : 'w-upvoteBtn h-upvoteBtn'
      } rounded-card flex ${
        horizontal ? 'justify-center items-center' : 'flex-col'
      } items-center cursor-pointer ${getBgColor()}`}
      onClick={onButtonClick}
    >
      <img
        className={`${horizontal ? '' : 'pt-3'}`}
        src={`${
          isUpvoted
            ? '/assets/shared/icon-arrow-up-white.svg'
            : '/assets/shared/icon-arrow-up.svg'
        }`}
        alt=''
      />
      <p
        className={`${horizontal ? 'pl-2' : 'pt-2'} text-sm ${
          isUpvoted ? 'text-white' : 'text-darkBlue2'
        } font-bold`}
      >
        {upvotes}
      </p>
    </div>
  );
};

export default UpvoteButton;
