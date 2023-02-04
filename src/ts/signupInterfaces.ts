export interface SignupData {
  email: string;
  password: string;
  passwordRepeat: string;
  nick: string;
  gender: string;
}

export interface SignupValidation {
  formIsValid: boolean;
  error: null | string
}
