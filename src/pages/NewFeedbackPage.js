import { GoBackButton } from '../components/common';
import { CreateNewFeedbackCard } from '../components/new-feedback';

const NewFeedbackPage = () => {
  return (
    <div className='w-newFeedbackMobile py-9 mx-auto flex flex-col md:w-newFeedback md:py-pageTop'>
      <div className='w-full mb-14 flex justify-start md:mb-[68px]'>
        <GoBackButton />
      </div>
      <CreateNewFeedbackCard />
    </div>
  );
};

export default NewFeedbackPage;
