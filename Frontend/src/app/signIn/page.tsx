"use client";
import React, { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "@/api/userApi";
import { FormData } from "../../interfaces";
import OtpComponent from "../../components/customComponents/OtpComponent";
import { OtpDataInterface } from "../../interfaces/index";
import ViewForm from "@/components/customComponents/ViewForm";
import EmailComponent from "@/components/customComponents/EmailComponent";
import {
  EMAIL,
  EMAIL_REQUIRED_MESSAGE,
  ENTER_ALL_FOUR_DIGIT_OTP,
  OTP,
  PLEASE_ENTER_VALIDE_EMAIL,
  RESEND_OTP_SUCCESSFULL,
  Show_FORM,
} from "@/constants/label";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/store/slice";
import { RootState } from "@/store/store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn() {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const userData = useSelector((state:RootState) => state.formData);

  const [state, setState] = useState<String>(EMAIL);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [otpData, setOtpData] = useState<OtpDataInterface>({
    firstField: "",
    secondField: "",
    thirdField: "",
    fourthField: "",
  });

  const [EmailFormData, setEmailFormData] = useState<{ email: string }>({
    email: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [emailErrors, setEmailErrors] = useState<{ [key: string]: string }>({});
  // const [userData, setuserData] = useState<FormData>();
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderOtp, setLoaderOtp] = useState<boolean>(false);

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
      if (result.status === 200) {
        setState(OTP);
        setLoader(false);
        setErrorMessage("");
      } else {
        setErrorMessage(result.message.data.message);
        setLoader(false);
      }
    }
  };
  const handleOtpData = async (e: React.FormEvent) => {
    e.preventDefault();

    let tempOtpData = "";
    const newErrors: { [key: string]: string } = {};
    Object.entries(otpData).forEach(([key, value]) => {
      let flag = false;
      tempOtpData = tempOtpData + value;
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

    const result = await verifyOtp({
      email: EmailFormData.email,
      otp: tempOtpData,
    });
    if (result.status === 200) {
      setLoader(false);
      dispatch(setFormData(result.userData));
      // setuserData(result.userData);
      setState(Show_FORM);
      setErrorMessage("");
    } else {
      setErrorMessage(result.message.data.message);
      setLoader(false);
    }
    setOtpData({
      firstField: "",
      secondField: "",
      thirdField: "",
      fourthField: "",
    });
    setErrors({});
  };
  const handleResendOtp = async () => {
    setErrorMessage("");
    setLoaderOtp(true);

    const result = await sendOtp(EmailFormData);
    if (result.status === 200) {
      setTimeLeft(60);
      setIsDisabled(true);
      setLoaderOtp(false);

      console.log(RESEND_OTP_SUCCESSFULL);
    } else {
      if (result?.status === 404 && result.message.data.timerExceed) {
        setTimeLeft(60 * 15);
        setErrorMessage(result.message.data.message);
      }
      setIsDisabled(true);
      setLoaderOtp(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft]);
  return (
    <>
      {state !== "" && state === Show_FORM && userData ? (
        <ViewForm userData={userData} />
      ) : (
        <>
          <section className="h-screen">
            <div className="h-full">
              <div className="flex h-full flex-wrap items-center justify-center lg:justify-between banner_color_grad">
                <div className="mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                  <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    className="w-full"
                    alt="Sample image"
                  />
                </div>

                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                  <div className="my-4  items-center ">
                    <div className="flex flwx-row justify-evenly mt-6">
                      <div>
                        <div className="w-[480px]">
                          {errorMessage !== "" && (
                            <div className="text-center text-white">
                              {errorMessage}
                            </div>
                          )}
                        </div>
                        {state !== "" && state === EMAIL && (
                          <div className="animation">
                            <EmailComponent
                              EmailFormData={EmailFormData}
                              handleInputChange={handleInputChange}
                              emailErrors={emailErrors}
                              loader={loader}
                              handleSubmit={handleSubmit}
                            />
                          </div>
                        )}

                        {state !== "" && state === OTP && otpData && (
                          <div className="animation">
                            <OtpComponent
                              otpData={otpData}
                              handleInputChange={handleInputChange}
                              loader={loader}
                              loaderOtp={loaderOtp}
                              handleOtpData={handleOtpData}
                              handleResendOtp={handleResendOtp}
                              errors={errors}
                              isDisabled={isDisabled}
                              timeLeft={timeLeft}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
