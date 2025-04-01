// Enum for Gender
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
    PreferNotToSay = "prefer_not_to_say",
  }
  
  // Interface for User
  export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: Gender; 
    token: string;
  }
  