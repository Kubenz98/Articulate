import { SignupData, SignupValidation } from "src/ts/signupInterfaces";

const emailValidation = (email: string) => {
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return email.match(validRegex) ? true : false;
};

export const passwordValidation = (data: string) => (data.length >= 6 ? true : false);

export const equalPasswords = (pwd1: string, pwd2: string) => (pwd1 === pwd2 ? true : false);

const nickLengthValidation = (nick: string) =>
  nick.trim().length === 0 ? false : true;

const uniqueNickValidation = (usernames: string[], nick: string) => {
  if (usernames.some((name) => name.toLowerCase() === nick.toLowerCase())) {
    return false;
  } else return true;
};

const formValidation = (data: SignupData, isLogin = true, usernames: string[]) => {

  let validationData: SignupValidation = {
    formIsValid: false,
    error: null
  }
  
  if (!isLogin) {
    const email = emailValidation(data.email);
    const pwd = passwordValidation(data.password);
    const equalPwd = equalPasswords(data.password, data.passwordRepeat);
    const nickLength = nickLengthValidation(data.nick);
    const uniqueNick = uniqueNickValidation(usernames, data.nick);

    if (!email) {
      validationData.error = "Invalid email.";
    } else if (!pwd) {
      validationData.error = "Password must have at least 6 characters.";
    } else if (!equalPwd) {
      validationData.error = "Passwords are not the same.";
    } else if (!nickLength) {
      validationData.error = "Nickname is too short.";
    } else if (!uniqueNick) {
      validationData.error = "Invalid nickname provided.";
    }

    if (email && pwd && equalPwd && nickLength && uniqueNick) {
       validationData.formIsValid = true;
    } else  validationData.formIsValid = false;
  }

  return validationData
};

export default formValidation;
