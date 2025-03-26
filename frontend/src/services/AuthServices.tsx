import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
export const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      return response;
    } catch (error: any) {
      throw error; 
    }
  };

  export const registerUser = async (formData: { name: string; email: string; password: string; gender: string; age: number; }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      return response;
    } catch (error: any) {
      throw error; 
    }
  };
