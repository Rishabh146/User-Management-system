
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string; 
  token: string;
}
export interface updateProfileType{
  name: string;
  email: string;
  age?: number;
  gender: string; 
}
export interface RegisterUser {
  name: string;
  email: string;
  age: number;
  gender: string; 
  token?: string;
}

export interface UserInfoType {
  payload: string;
  _id: string;
  status: string;
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  token: string; 
}