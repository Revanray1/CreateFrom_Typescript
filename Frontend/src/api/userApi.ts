
import { FormData } from '@/interfaces';
import apiClient from '../utils/apiClient';

export const createUser = async (data: FormData) => {
  try {
    const response = await apiClient.post('/createUser', data);
    return response.data;
  } catch (error) {
    console.log('Error creating user:', error);
  }
};

export const sendOtp = async (data: {email:string}) => {
  try {
    const response = await apiClient.post('/sendOtp', data);
    return response.data;
  } catch (error) {
    console.log('Error creating user:', error);
  }
};

export const verifyOtp = async (data: {email: string,otp:string}) => {
  try {
    const response = await apiClient.post('/verifyOtp', data);
    return response.data;
  } catch (error) {
    console.log('Error creating user:', error);
  }
};
