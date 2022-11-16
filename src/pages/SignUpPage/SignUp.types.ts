export interface ISignInData {
  login: string;
  password: string;
}

export interface ISignUpData extends ISignInData {
  name?: string;
}

export type InputsArray = 'name' | 'password' | 'login';
