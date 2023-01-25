const emailValidation = (email) => {
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return email.match(validRegex) ? true : false;
};

export const passwordValidation = (data) => (data.length >= 6 ? true : false);

export const equalPasswords = (pwd1, pwd2) => (pwd1 === pwd2 ? true : false);

const nickLengthValidation = (nick) =>
  nick.trim().length === 0 ? false : true;

const uniqueNickValidation = (usernames, nick) => {
  if (usernames.some((name) => name.toLowerCase() === nick.toLowerCase())) {
    return false;
  } else return true;
};

const formValidation = (data, isLogin = true, usernames) => {
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
    const nickLength = nickLengthValidation(data.nick);
    const uniqueNick = uniqueNickValidation(usernames, data.nick);

    if (!email) {
      error = "Invalid email.";
    } else if (!pwd) {
      error = "Password must have at least 6 characters.";
    } else if (!equalPwd) {
      error = "Passwords are not the same.";
    } else if (!nickLength) {
      error = "Nickname is too short.";
    } else if (!uniqueNick) {
      error = "Invalid nickname provided.";
    }

    if (email && pwd && equalPwd && nickLength && uniqueNick) {
      return { formIsValid: true, error: null };
    } else return { formIsValid: false, error };
  }
};

export default formValidation;
