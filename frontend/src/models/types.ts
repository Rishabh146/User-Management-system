export interface BaseUser {
  name: string;
  email: string;
  age?: number;
  gender?: string; 
}

// redefine the interface

export interface LoginCredential {
  email: string;
  password: string;
}

export interface FormDataType extends BaseUser {
  password: string;
}

export interface User extends BaseUser {
  id: number;
  token: string;
}

export interface UpdateProfileType extends Partial<Pick<BaseUser, 'age'>> {
  name: string;
  email: string;
  gender?: string;
}

export interface RegisterUser extends BaseUser {
  token?: string;
}

export interface UserInfoType extends User {
  _id: string;
  status: string;
}

export interface statusUpdateType {
  userId: string;
  status: string;
}
