export const saveUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  } catch {
    return null;
  }
};

export const removeUserInLocalStorage = () => {
  localStorage.removeItem('user');
};
