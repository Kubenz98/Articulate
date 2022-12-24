const emailValidation = (email) => {
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return email.match(validRegex) ? true : false;
};

const passwordValidation = (data) => (data.length >= 6 ? true : false);

const equalPasswords = (pwd1, pwd2) => (pwd1 === pwd2 ? true : false);

const formValidation = (data, isLogin = true) => {
  let error;

  if (isLogin) {
    const email = emailValidation(data.email);
    const pwd = passwordValidation(data.password);

    if (!email) {
      error = "Invalid email";
    } else if (!pwd) {
      error = "Password must have at least 6 characters";
    }
    if (email && pwd) {
      return { formIsValid: true, error: null };
    } else return { formIsValid: false, error };
  }

  if (!isLogin) {
    const email = emailValidation(data.email);
    const pwd = passwordValidation(data.password);
    const equalPwd = equalPasswords(data.password, data.passwordRepeat);

    if (!email) {
      error = "Invalid email";
    } else if (!pwd) {
      error = "Password must have at least 6 characters";
    } else if (!equalPwd) {
      error = "Passwords are not the same.";
    }

    if (email && pwd && equalPwd) {
      return { formIsValid: true, error: null };
    } else return { formIsValid: false, error };
  }
};

export default formValidation;
