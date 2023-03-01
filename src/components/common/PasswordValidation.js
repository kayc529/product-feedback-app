import { useEffect, useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { MIN_PASSWORD_LENGTH } from '../../data/constants';
import {
  containsNumber,
  containsUppercaseAlphabet,
  containsSpecialCharacter,
  hasPasswordMinimumLength,
} from '../../utils/validationHelper';

const PasswordValidation = ({ password }) => {
  const [checks, setChecks] = useState([false, false, false, false]);
  useEffect(() => {
    let temp = [...checks];
    //1. one uppercase character
    temp[0] = containsUppercaseAlphabet(password);
    //2. one number
    temp[1] = containsNumber(password);
    //3. one special character
    temp[2] = containsSpecialCharacter(password);
    //4. at least 8 characters
    temp[3] = hasPasswordMinimumLength(password);

    setChecks(temp);
  }, [password]);

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        {checks[0] ? <TiTick color='green' /> : <TiTimes color='red' />}
        <p className={`text-sm ${checks[0] ? 'text-green-500' : 'text-red'}`}>
          Password must contain at least one uppercase alphabet
        </p>
      </div>
      <div className='flex'>
        {checks[1] ? <TiTick color='green' /> : <TiTimes color='red' />}
        <p className={`text-sm ${checks[1] ? 'text-green-500' : 'text-red'}`}>
          Password must contain at least one number
        </p>
      </div>
      <div className='flex'>
        {checks[2] ? <TiTick color='green' /> : <TiTimes color='red' />}
        <p className={`text-sm ${checks[2] ? 'text-green-500' : 'text-red'}`}>
          Password must contain at least one special character
        </p>
      </div>
      <div className='flex'>
        {checks[3] ? <TiTick color='green' /> : <TiTimes color='red' />}
        <p className={`text-sm ${checks[3] ? 'text-green-500' : 'text-red'}`}>
          Password must have at least {MIN_PASSWORD_LENGTH} characters
        </p>
      </div>
    </div>
  );
};

export default PasswordValidation;
