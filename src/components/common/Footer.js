const Footer = () => {
  const goToGithub = () => {
    window.open('https://github.com/kayc529');
  };

  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className='mt-auto w-full bg-banner bg-no-repeat bg-cover'>
      <div className='w-full mx-auto py-8 flex flex-col justify-center items-center lg:w-footer'>
        <p className='text-white font-bold'>
          Frontend Mentor Product Feedback Application
        </p>
        <p className='text-white font-bold'>
          {`Developed by Kay Cheung©${getYear()}`}
        </p>
        <img
          className='w-10 h-10 mt-4 cursor-pointer'
          src='/assets/shared/icon-github.svg'
          alt=''
          onClick={goToGithub}
        />
      </div>
    </footer>
  );
};

export default Footer;
