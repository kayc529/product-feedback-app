import Comment from './Comment';

const CommentsContainer = ({ comments }) => {
  return (
    <div className='w-full rounded-card bg-white pt-6 px-6 pb-4 mt-6 md:px-8 md:mt-12 lg:max-w-suggestionDetailPage'>
      <h3 className='text-h3 text-darkBlue1 font-bold'>
        {comments.length} comments
      </h3>
      <ul className='w-full flex flex-col'>
        {comments?.map((comment, index) => {
          return (
            <li key={index}>
              <Comment
                comment={comment}
                isLastChild={index === comments.length - 1}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentsContainer;
