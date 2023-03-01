import { useState } from 'react';
import { MIN_USERNAME_LENGTH, MIN_PASSWORD_LENGTH } from '../../data/constants';
import { Button, InputRow, PasswordValidation } from '../common';
import { validateEmail } from '../../utils/validationHelper';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../features/user/userSlice';
import { toastMessage, TOAST_TYPE } from '../../utils/toastHelper';

const LoginRegisterCard = () => {
  const INIT_INPUT = {
    email: { value: '', isError: false, errorMsg: '' },
    username: { value: '', isError: false, errorMsg: '' },
    firstname: { value: '', isError: false, errorMsg: '' },
    lastname: { value: '', isError: false, errorMsg: '' },
    password: { value: '', isError: false, errorMsg: '' },
    retype: { value: '', isError: false, errorMsg: '' },
  };
  const [isLogin, setIsLogin] = useState(true);
  const [input, setInput] = useState(INIT_INPUT);
  const dispatch = useDispatch();

  const onInputChange = (name, value) => {
    let temp = { ...input };
    temp[name].value = value;
    temp[name].isError = false;
    setInput(temp);
  };

  const toggleLoginRegister = () => {
    setInput(INIT_INPUT);
    setIsLogin((prev) => !prev);
  };

  const loginOrRegister = async (e) => {
    e.preventDefault();

    if (!areInputFieldsValid()) {
      return;
    }

    try {
      let results;
      if (isLogin) {
        results = await dispatch(
          loginUser({
            username: input.username.value,
            password: input.password.value,
          })
        ).unwrap();
      } else {
        results = await dispatch(
          registerUser({
            username: input.username.value,
            password: input.password.value,
            firstname: input.firstname.value,
            lastname: input.lastname.value,
            email: input.email.value,
          })
        ).unwrap();
      }

      if (results.success) {
        toastMessage(`Welcome, ${results.user.firstname}!`, TOAST_TYPE.SUCCESS);
      }
    } catch (error) {
      toastMessage(error, TOAST_TYPE.ERROR);
    }
  };

  const areInputFieldsValid = () => {
    if (isLogin) {
      return isUsernameValid() && isPasswordValid();
    }

    return (
      isEmailValid() &&
      isUsernameValid() &&
      isFirstnameValid() &&
      isLastnameValid() &&
      isPasswordValid() &&
      isRetypePasswordValid()
    );
  };

  const isUsernameValid = () => {
    if (input.username.value.length < MIN_USERNAME_LENGTH) {
      let temp = { ...input };
      temp.username.isError = true;
      temp.username.errorMsg = 'Must be at least 8 characters in length';
      setInput(temp);
      return false;
    }
    return true;
  };

  const isPasswordValid = () => {
    if (input.password.value.length < MIN_PASSWORD_LENGTH) {
      let temp = { ...input };
      temp.password.isError = true;
      temp.password.errorMsg = 'Must be at least 8 characters in length';
      setInput(temp);
      return false;
    }
    return true;
  };

  const isRetypePasswordValid = () => {
    if (input.retype.value !== input.password.value) {
      let temp = { ...input };
      temp.retype.isError = true;
      temp.retype.errorMsg = 'Two passwords must match';
      setInput(temp);
      return false;
    }
    return true;
  };

  const isFirstnameValid = () => {
    if (input.firstname.value.length === 0) {
      let temp = { ...input };
      temp.firstname.isError = true;
      temp.firstname.errorMsg = 'Firstname cannot be empty';
      setInput(temp);
      return false;
    }
    return true;
  };

  const isLastnameValid = () => {
    if (input.lastname.value.length === 0) {
      let temp = { ...input };
      temp.lastname.isError = true;
      temp.lastname.errorMsg = 'Lastname cannot be empty';
      setInput(temp);
      return false;
    }
    return true;
  };

  const isEmailValid = () => {
    if (!validateEmail(input.email.value)) {
      let temp = { ...input };
      temp.email.isError = true;
      temp.email.errorMsg = 'Please enter a valid email address';
      setInput(temp);
      return false;
    }
    return true;
  };

  const getLoginInputFields = () => {
    return (
      <>
        <InputRow
          text='username'
          name='username'
          value={input.username.value}
          isError={input.username.isError}
          errorMsg={input.username.errorMsg}
          onInputChange={onInputChange}
        />
        <InputRow
          key='password'
          text='password'
          name='password'
          inputType='password'
          maxLength={16}
          value={input.password.value}
          isError={input.password.isError}
          errorMsg={input.password.errorMsg}
          onInputChange={onInputChange}
          isPasswordField={true}
        />
      </>
    );
  };

  const getRegisterInputFields = () => {
    return (
      <>
        <InputRow
          text='email'
          name='email'
          inputType='email'
          value={input.email.value}
          isError={input.email.isError}
          errorMsg={input.email.errorMsg}
          onInputChange={onInputChange}
        />
        <InputRow
          key='username'
          text='username'
          name='username'
          inputType='text'
          value={input.username.value}
          isError={input.username.isError}
          errorMsg={input.username.errorMsg}
          onInputChange={onInputChange}
        />
        <InputRow
          text='first name'
          name='firstname'
          value={input.firstname.value}
          isError={input.firstname.isError}
          errorMsg={input.firstname.errorMsg}
          onInputChange={onInputChange}
        />
        <InputRow
          text='last name'
          name='lastname'
          value={input.lastname.value}
          isError={input.lastname.isError}
          errorMsg={input.lastname.errorMsg}
          onInputChange={onInputChange}
        />
        <InputRow
          text='password'
          name='password'
          inputType='password'
          maxLength={16}
          value={input.password.value}
          isError={input.password.isError}
          errorMsg={input.password.errorMsg}
          isPasswordField={true}
          onInputChange={onInputChange}
        />
        <div className='pb-4'>
          <PasswordValidation password={input.password.value} />
        </div>
        <InputRow
          text='retype password'
          name='retype'
          inputType='password'
          maxLength={16}
          value={input.retype.value}
          isError={input.retype.isError}
          errorMsg={input.retype.errorMsg}
          onInputChange={onInputChange}
        />
      </>
    );
  };

  return (
    <div className='w-newFeedbackMobile px-6 py-8 mb-20 mx-auto rounded-card bg-white flex flex-col items-center jusitfy-center md:w-newFeedback'>
      <h1 className='text-h1 text-darkBlue1 font-bold pb-4'>
        {isLogin ? 'Login' : 'Register'}
      </h1>
      <form className='w-full flex flex-col items-center space-y-1'>
        {isLogin ? getLoginInputFields() : getRegisterInputFields()}
        <p className='text-md text-darkBlue2 pb-4'>
          {isLogin ? 'New comer? ' : 'Already have an account? '}
          <span
            className='text-blue underline cursor-pointer'
            onClick={toggleLoginRegister}
          >
            {isLogin ? 'Join us!' : 'Login here!'}
          </span>
        </p>
        <Button
          text={isLogin ? 'Login' : 'Register'}
          callback={loginOrRegister}
        />
      </form>
    </div>
  );
};

export default LoginRegisterCard;
