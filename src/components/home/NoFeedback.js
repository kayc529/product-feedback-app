import { ButtonColors } from '../../data/colors';
import { Button } from '../common';

const NoFeedback = () => {
  return (
    <div className='w-suggestionBoardMobile h-noFeedbackMobile rounded-card mt-8 mx-auto flex flex-col items-center justify-center bg-white md:h-noFeedback md:w-suggestionBoardTablet md:mt-6 lg:max-w-suggestionBoard'>
      <img
        className='w-[102px] h-[108px] mb-[39px] md:w-[129px] md:h-[136px] md:mb-[54px]'
        src='assets/suggestions/illustration-empty.svg'
        alt=''
      />
      <h1 className='text-h3 text-darkBlue1 font-bold md:text-h1'>
        There is no feedback yet.
      </h1>
      <p className='w-[278px] text-sm text-center text-greyishBlue pt-4 pb-6 md:w-[410px] md:pb-12 md:text-lg md:leading-lg'>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button text='+ Add Feedback' color={ButtonColors.PINK} />
    </div>
  );
};

export default NoFeedback;
