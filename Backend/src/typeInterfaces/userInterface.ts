// src/types.d.ts (or another suitable file)
export interface Education {
    collegeName: string;
    joinedOnYear: string; 
    completedYear: string; 
  }
  
  export interface WorkExperience {
    companyName: string;
    workJoinedYear: string; 
    workRelievedYear: string; 
  }
  
  export interface CreateUserRequestBody {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    education: Education[];
    workExperience: WorkExperience[];
  }
  