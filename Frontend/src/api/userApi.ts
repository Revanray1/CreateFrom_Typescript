
import { FormData } from '@/interfaces';
import apiClient from '../utils/apiClient';
import axios, { AxiosError } from 'axios';

const  responseErrorValidation=(error: AxiosError<any, any>)=> {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return { status: 400, message: error.response }
      case 401:
        return { status: 401, message: error.response }
      case 403:
        return { status: 403, message: error.response }
      case 404:
        return { status: 404, message: error.response }
      case 500:
        return { status: 500, message: error.response }
      default:
        console.error(`Unexpected error: ${error.response.status}`);
    }
  } else if (error.request) {
    console.error('No response received: Network or server issue.');
  } else {
    console.error('Error in setting up the request:', error.message);
  }
}

export const createUser = async (data: FormData) => {
  try {
    const response = await apiClient.post('/createUser', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return  responseErrorValidation(error)
  }
}
};

export const sendOtp = async (data: { email: string }) => {
  try {
    const response = await apiClient.post('/sendOtp', data);
    return response.data;
  } catch (error) {

    if (axios.isAxiosError(error)) {
      return  responseErrorValidation(error)
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
};

export const verifyOtp = async (data: { email: string, otp: string }) => {
  try {
    const response = await apiClient.post('/verifyOtp', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
     return  responseErrorValidation(error)
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
};
