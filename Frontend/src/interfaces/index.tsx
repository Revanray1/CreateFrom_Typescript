interface Education {
  collegeName: string;
  joinedOnYear: string;
  completedYear: string;
}

interface WorkExperience {
  companyName: string;
  workJoinedYear: string;
  workRelievedYear: string;
}


export interface OtpDataInterface {
  firstField: string;
  secondField: string;
  thirdField: string;
  fourthField: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  education: Education[];
  workExperience: WorkExperience[];
}

interface Step {
  id: number;
  label: string;
  content: string;
} []

export interface StepperProps {
  steps: Step[];
}
export interface WorkExperienceDetailsProps {
  formData: {
      workExperience: { companyName: string; workJoinedYear: string; workRelievedYear: string }[];
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string, type: 'workExperience') => void;
  addWorkExperience: () => void;
  errors: { [key: string]: string };
  prevStep: () => void;
  nextStep: () => void;
  handleDeleteFields: (index: number, field: string) => void;
}

export interface EducationDetailsProps {
  formData: {
    education: { collegeName: string; joinedOnYear: string; completedYear: string }[];
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string, type: 'education') => void;
  handleDeleteFields: (index: number, field: string) => void;
  addEducation: () => void;
  errors: { [key: string]: string };
  nextStep: () => void;
  prevStep: () => void;
}

export interface BasicDetailsProps {
  formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
  nextStep: () => void;
}

export interface OtpComponentProps {
  errors: { [key: string]: string };
  loader: boolean;
  loaderOtp:boolean;
  otpData: OtpDataInterface;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResendOtp: (e: React.FormEvent) => void;
  handleOtpData: (e: React.FormEvent) => void;
  isDisabled:boolean,
  timeLeft:number,
  errorMessage:String

}

export interface ViewFormDetailsProps {
  userData: FormData,
}

export interface EmailcomponentProps{
  EmailFormData:{[key: string]: string};
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailErrors:{[key: string]: string};
  loader:boolean;
  handleSubmit:(e: React.FormEvent) => void;
  errorMessage:String   ;
}
