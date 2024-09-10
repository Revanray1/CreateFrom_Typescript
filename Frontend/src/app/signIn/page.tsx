"use client"
import { sendOtp, verifyOtp } from '@/api/userApi';
import React, { useState } from 'react'
import { FormData } from "../../interfaces"
import OtpComponent from '../../components/customComponents/OtpComponent';
import { OtpDataInterface } from '../../interfaces/index';
import ViewForm from '@/components/customComponents/ViewForm';
import EmailComponent from '@/components/customComponents/EmailComponent';
import { EMAIL, EMAIL_REQUIRED_MESSAGE, ENTER_ALL_FOUR_DIGIT_OTP, ERROR_SENDING_OTP, FORM_DETAILS, OTP,OTP_RESEND_FAILED,PLEASE_ENTER_VALIDE_EMAIL,RESEND_OTP_SUCCESSFULL,Show_FORM, SIGN_IN } from '@/constants/label';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function signIn() {
  const [state, setState] = useState<String>(EMAIL);
  const [otpData, setOtpData] = useState<OtpDataInterface>({
    firstField: '',
    secondField: '',
    thirdField: '',
    fourthField: ''
  });

  const [EmailFormData, setEmailFormData] = useState<{ email: string }>({ email: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [emailErrors, setEmailErrors] = useState<{ [key: string]: string }>({});
  const [userData, setuserData] = useState<FormData>();
  const [loader, setLoader] = useState<boolean>(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === EMAIL) {
      setEmailFormData({
        ...EmailFormData,
        [name]: value,
      });
    } else {
      setOtpData({
        ...otpData,
        [name]: value,
      });
    }
  };

  const validateForm = (data: { [key: string]: string }) => {
    const newErrors: { [key: string]: string } = {};
    if (!data.email.trim()) {
      newErrors.email = EMAIL_REQUIRED_MESSAGE;
    } else if (!emailRegex.test(data.email.trim())) {
      newErrors.email = PLEASE_ENTER_VALIDE_EMAIL;
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(EmailFormData);
    if (Object.keys(validationErrors).length > 0) {
      setEmailErrors(validationErrors);
    } else {
      setEmailErrors({});
      setLoader(true);
      const result = await sendOtp(EmailFormData);
      if (result) {
        setState(OTP);
        setLoader(false);
      } else {
        setLoader(false);
        console.log(ERROR_SENDING_OTP);
      }
    }
  };
  const handleOtpData = async (e: React.FormEvent) => {
    e.preventDefault();

    let tempOtpData = ""
    const newErrors: { [key: string]: string } = {};
    Object.entries(otpData).forEach(([key, value]) => {
      let flag = false;
      tempOtpData = tempOtpData + value
      if (!value.trim()) {
        flag = true;
      }
      if (flag) {
        newErrors[OTP] = ENTER_ALL_FOUR_DIGIT_OTP;

      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoader(true);

    const result = await verifyOtp({ email: EmailFormData.email, otp: tempOtpData });
    if (result) {
      setLoader(false);
      setuserData(result.userData);
      setState(Show_FORM);
    } else {
      setLoader(false);
      // custom Error Message need to work on

    }
    setOtpData({ firstField: '', secondField: '', thirdField: '', fourthField: '' });
    setErrors({});
  };

  const handleResendOtp = async () => {
    const result = await sendOtp(EmailFormData);
    if(result){
      console.log(RESEND_OTP_SUCCESSFULL)
    }else{
    console.log(OTP_RESEND_FAILED)
    }
  }

  return (<>
    <div className='p-8  ' >
      <div className="container mx-auto my-6 flex justify-center" >
        <div className="text-center" >
          <div className='w-52 2xl:w-96 bg-slate-300 hadow-gray-800 rounded p-1' >
            <h1 className=' text-lg sm:text-sm md:text-2xl lg:text-2xl 2xl:text-6xl text-[#484957] font-bold'>{state === Show_FORM ? FORM_DETAILS: SIGN_IN}</h1>
          </div>
        </div>
      </div>

      {(state !== "" && state === EMAIL) &&
        <EmailComponent EmailFormData={EmailFormData} handleInputChange={handleInputChange} emailErrors={emailErrors} loader={loader} handleSubmit={handleSubmit} />
      }


      {(state !== "" && state === OTP && otpData) &&
        <OtpComponent otpData={otpData} handleInputChange={handleInputChange} loader={loader} handleOtpData={handleOtpData} handleResendOtp={handleResendOtp} errors={errors} />
      }

      {(state !== "" && state === Show_FORM && userData) && (
        <ViewForm userData={userData} />
      )}
    </div>
  </>)
}
