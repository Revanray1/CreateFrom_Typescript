

import React, { useRef, useEffect } from 'react';
import Button from './Button';
import { OtpComponentProps } from '../../interfaces/index';

const OtpComponent: React.FC<OtpComponentProps> = ({
  loaderOtp,
  errors,
  loader,
  otpData,
  handleInputChange,
  handleResendOtp,
  handleOtpData,
  isDisabled,
  timeLeft
}) => {
  const myRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = Object.keys(otpData).indexOf(name);
    if (index === 3 && value.length > 1 && value) {
      return
    }

    handleInputChange(e);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  console.log(timeLeft)
  useEffect(() => {
    if (myRef.current) {
      const firstInput = myRef.current.children[0] as HTMLInputElement | null;
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, []);

  return (
    <div className=" bg-blue-500 py-10 px-3 w-full banner_color_grad">
      <div className="container mx-auto">
        <div className="">
          <div className="w-full">
            <div className="bg-white  py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4 font-kanit p-4">
                <span >Enter the OTP you received at your Email</span>
              </div>
              <form>
                <div
                  className="flex flex-row justify-center text-center px-2 mt-5"
                  id="parent"
                  ref={myRef}
                >
                  <input
                    ref={(el) => { inputRefs.current[0] = el; }}
                    className="m-2 border h-10 w-10 text-center form-control rounded border-gray-500"
                    type="number"
                    name="firstField"
                    value={otpData.firstField}
                    onChange={handleOtpInputChange}
                    id="1"
                    maxLength={1}
                  />
                  <input
                    ref={(el) => { inputRefs.current[1] = el; }}
                    className="m-2 border h-10 w-10 text-center form-control rounded border-gray-500"
                    type="number"
                    name="secondField"
                    value={otpData.secondField}
                    onChange={handleOtpInputChange}
                    id="2"
                    maxLength={1}
                  />
                  <input
                    ref={(el) => { inputRefs.current[2] = el; }}
                    className="m-2 border h-10 w-10 text-center form-control rounded border-gray-500"
                    type="number"
                    name="thirdField"
                    value={otpData.thirdField}
                    onChange={handleOtpInputChange}
                    id="3"
                    maxLength={1}
                  />
                  <input
                    ref={(el) => { inputRefs.current[3] = el; }}
                    className="m-2 border h-10 w-10 text-center form-control rounded border-gray-500"
                    type="number"
                    name="fourthField"
                    value={otpData.fourthField}
                    onChange={handleOtpInputChange}
                    id="4"
                    maxLength={1}
                  />
                </div>

                <div className="h-6">
                  {errors.otp && <p style={{ color: 'red' }}>{errors.otp}</p>}
                </div>
                <div className="flex justify-center">
                  {loader ? (
                    <Button />
                  ) : (
                    <button
                      type="button"
                      className="border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline items-center"
                      disabled={loader}
                      onClick={handleOtpData}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div className="flex justify-center text-center mt-3">
                {loaderOtp ? <Button /> : <> {timeLeft <= 60 ?
                  <button
                    className={`flex items-center cursor-pointer`}
                    onClick={handleResendOtp} disabled={isDisabled}
                  >
                    <span className={`font-bold ${isDisabled ? "text-red-500" : "text-blue-700"}`} >{isDisabled ? `Resend OTP in ${timeLeft}s` : 'Resend OTP'}</span>
                    <i className="bx bx-caret-right ml-1"></i>
                  </button>
                  : ""}</>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpComponent;

