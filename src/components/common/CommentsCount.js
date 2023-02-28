const CommentsCount = ({ commentCount = 0 }) => {
  return (
    <div className='flex items-center'>
      <img src='/assets/shared/icon-comments.svg' alt='' />
      <p
        className={`text-sm text-darkBlue1 font-bold pl-2 ${
          commentCount > 0 ? '' : 'opacity-50'
        } lg:text-lg`}
      >
        {commentCount}
      </p>
    </div>
  );
};

export default CommentsCount;
