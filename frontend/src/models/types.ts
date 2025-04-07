export interface BaseUser {
  name: string;
  email: string;
  age: number;
  gender: string;
}

export interface User extends BaseUser {
  id: number;
  token: string;
}

export interface updateProfileType extends Omit<BaseUser, 'age'> {
  age?: number;
}

export interface RegisterUser extends BaseUser {
  token?: string;
}

export interface UserInfoType extends User {
  _id: string;
  status: string;
}
