import { useNavigate } from 'react-router-dom';

const GoBackButton = ({ callback, darkMode = false }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (callback) {
      callback();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      className={`flex items-center justify-start bg-transparent`}
      onClick={goBack}
    >
      <span
        className={`${darkMode ? 'gobackbtn-icon-dark' : 'gobackbtn-icon'}`}
      ></span>
      <p
        className={`${
          darkMode ? 'text-white' : 'text-darkBlue1'
        } text-h4 font-bold pl-3 hover:underline`}
      >
        Go Back
      </p>
    </button>
  );
};

export default GoBackButton;
