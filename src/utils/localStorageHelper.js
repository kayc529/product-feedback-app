export const saveUserInLocalStorage = (user) => {
  console.log('save user to local storage');
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  } catch {
    console.log('cannot get user from local storage');
    return null;
  }
};

export const removeUserInLocalStorage = () => {
  console.log('remove user from local storage');
  localStorage.removeItem('user');
};
