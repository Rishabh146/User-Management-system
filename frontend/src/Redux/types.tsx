
  export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string; 
    token: string;
  }
  export interface RegisterUser {
    name: string;
    email: string;
    age: number;
    gender: string; 
    token?: string;
  }
  