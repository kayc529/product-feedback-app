const init = { firstname: '', lastname: '', username: '', image: '' };
const UsernameRow = ({ user = init, onReplyClick }) => {
  let { firstname, lastname, username, image } = user;

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex'>
        <img
          className='w-profile h-profile rounded-[40px]'
          src={image || '/assets/user-images/image-default-profile-pic.jpeg'}
          alt=''
        />
        <div className='flex flex-col pl-4 md:pl-8'>
          <h3 className='text-sm text-darkBlue1 font-bold leading-h3 md:text-h3'>
            {firstname || ''} {lastname || ''}
          </h3>
          <p className='text-sm text-greyishBlue -mt-1 md:leading-h4 md:text-h4 md:mt-0'>
            @{username}
          </p>
        </div>
      </div>
      <button
        className='text-blue text-sm font-semibold hover:underline'
        onClick={() => onReplyClick(username)}
      >
        Reply
      </button>
    </div>
  );
};

export default UsernameRow;
