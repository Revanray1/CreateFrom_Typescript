"use client"
import React, { useState } from "react";
import BasicDetailsForm from "./FormBasicDetails"
import EducationDetails from "./FormEducationalDetails"
import WorkExperienceDetails from "./FormWorkExperience"
import { createUser } from '../../api/userApi';
import MessageWithButtonComponent from './MessageWithButtonComponent'
import { FormData, StepperProps } from "../../interfaces"
import { EDUCATION, EMAIL, WORK_EXPERIENCE, ENTER_TEN_DIGIT_MOBILE_NUMBER, MOBILE_NUMBER_REQUIRED, PLEASE_SELECT_GENDER, EMAIL_REQUIRED, LAST_NAME_REQUIRED, FIRST_NAME_REQUIRED, COLLEGE_COMPLETED_YEAR_REQUIRED, COLLEGE_JOINED_YEAR_REQUIRED, COLLEGE_NAME_REQUIRED, COMPANY_COMPLETED_YEAR_REQUIRED, COMPANY_JOINED_YEAR_REQUIRED, COMPANY_NAME_REQUIRED } from "@/constants/label"

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [step, setStep] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    education: [{ collegeName: '', joinedOnYear: '', completedYear: '' }],
    workExperience: [{ companyName: '', workJoinedYear: '', workRelievedYear: '' }]
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: string, type?: 'education' | 'workExperience') => {
    const { name, value } = e.target;
    if (type && index !== undefined && field) {
      setFormData(prevState => {
        const updatedArray = [...prevState[type as 'education' | 'workExperience']];
        updatedArray[index] = {
          ...updatedArray[index],
          [field]: value
        };

        return { ...prevState, [type]: updatedArray };
      });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };

      if (index !== undefined && field) {
        updatedErrors[`${name + index}`] = '';
      } else {
        updatedErrors[name] = '';
      }
      return updatedErrors;
    });
  };

  const handleDeleteFields = (index: number, field: string) => {
    const tempData = { ...formData };

    if (field === EDUCATION && index >= 0 && index < tempData.education.length) {
      tempData.education = [
        ...tempData.education.slice(0, index),
        ...tempData.education.slice(index + 1)
      ];
      setFormData(tempData);
    } else if (field === WORK_EXPERIENCE && index >= 0 && index < tempData.workExperience.length) {
      tempData.workExperience = [
        ...tempData.workExperience.slice(0, index),
        ...tempData.workExperience.slice(index + 1)
      ];
      setFormData(tempData);
    } else {
      console.error("Index out of bounds or invalid field");
    }
  };
  const addEducation = () => {
    setFormData(prevState => ({
      ...prevState,
      education: [...prevState.education, { collegeName: '', joinedOnYear: '', completedYear: '' }]
    }));
  };

  const addWorkExperience = () => {
    setFormData(prevState => ({
      ...prevState,
      workExperience: [...prevState.workExperience, { companyName: '', workJoinedYear: '', workRelievedYear: '' }]

    }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};


    if (currentStep === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = FIRST_NAME_REQUIRED;
      if (!formData.lastName.trim()) newErrors.lastName = LAST_NAME_REQUIRED;
      if (!formData.email.trim()) newErrors.email = EMAIL_REQUIRED;
      if (!formData.gender.trim()) newErrors.gender = PLEASE_SELECT_GENDER;
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = MOBILE_NUMBER_REQUIRED;
      if (formData.phoneNumber.length > 0 && formData.phoneNumber.length < 10) newErrors.phoneNumber = ENTER_TEN_DIGIT_MOBILE_NUMBER;
    }

    if (currentStep === 1) {
      formData.education.forEach((education, index) => {
        if (!education.collegeName.trim()) newErrors[`collegeName${index}`] = COLLEGE_NAME_REQUIRED;
        if (!education.joinedOnYear.trim()) newErrors[`joinedOnYear${index}`] = COLLEGE_JOINED_YEAR_REQUIRED;
        if (!education.completedYear.trim()) newErrors[`completedYear${index}`] = COLLEGE_COMPLETED_YEAR_REQUIRED;
      });
    }

    if (currentStep === 2) {
      formData.workExperience.forEach((work, index) => {
        if (!work.companyName.trim()) newErrors[`companyName${index}`] = COMPANY_NAME_REQUIRED;
        if (!work.workJoinedYear.trim()) newErrors[`workJoinedYear${index}`] = COMPANY_JOINED_YEAR_REQUIRED;
        if (!work.workRelievedYear.trim()) newErrors[`workRelievedYear${index}`] = COMPANY_COMPLETED_YEAR_REQUIRED;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < steps.length - 1) {
        setStep(prevStep => prevStep + 1);
      }
      else {
        handleSubmit()
      }
    }
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };



  const handleSubmit = async () => {
    const isAllValid = [1, 2, 3].every(step => validateStep(step));
    if (isAllValid) {
      try {
        const result = await createUser(formData);
        if (result.status === 200) {
          setStep(prevStep => prevStep + 1);
        }
        else {
          setErrorMessage(result.message.data.message)
          setStep(4)
        }
      } catch (err) {
      }
    }
  };


  return (
    <>
      <div className="border border-black w-2/5 h-full p-4 ">
        <div className="stepper">
          <div>
            {steps.map(({ label, content, id }, index) => (
              <div key={"stpper" + id} className="stepper-container">
                <div
                  className={`step-number ${index <= step ? "active" : ""}`}
                >
                  {index + 1}
                  {index < steps.length - 1 && (
                    <div
                      className={`step-line ${index < step ? "active" : ""}`}
                    ></div>
                  )}
                </div>
                <div className="step-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border border-black  w-3/5  h-full p-4 overflow-scroll" >


        <div className=" bg-gray-100 flex items-center w-full">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h1 className="text-2xl font-semibold mb-6">{steps[step]?.label}</h1>
            {step === 0 && (<BasicDetailsForm formData={formData} handleInputChange={(e) => handleInputChange(e, 0, '')} errors={errors} nextStep={nextStep} />)}
            {step === 1 && (<EducationDetails formData={formData} handleInputChange={handleInputChange} addEducation={addEducation} errors={errors} nextStep={nextStep} prevStep={prevStep} handleDeleteFields={handleDeleteFields} />)}
            {step === 2 && (<WorkExperienceDetails formData={formData} handleInputChange={handleInputChange} addWorkExperience={addWorkExperience} errors={errors} nextStep={nextStep} handleDeleteFields={handleDeleteFields} prevStep={prevStep} />)}
            {step === 3 && (<MessageWithButtonComponent />)}
            {step === 4 && <div className="flex justify-center items-center h-full text-red-500"> {errorMessage}</div>}

          </div>
        </div>

      </div>
    </>
  );
};

export default Stepper;
