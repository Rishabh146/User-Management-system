import axios from 'axios';
import { RegisterUser, User } from '../Redux/types';
const API_URL = import.meta.env.VITE_API_URL;
export const loginUser = async (email: string, password: string): Promise<User> => {
    return axios.post<{ user: User }>(`${API_URL}/auth/login`, { email, password })
       .then((res) => res.data.user); // Extract `user` from the response
 };
 

  export const registerUser = async (formData: RegisterUser) => {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      return response;
    
  };
