"use client";

import React, { useState } from 'react';
import Stepper from "../../components/customComponents/Stepper";

const SignUp:React.FC = ({}) => {
  const steps = [
    { id: 1, label: "Basic Information", content: "Add Basic Information" },
    { id: 2, label: "Educational Details", content: "Add your Educational details" },
    { id: 3, label: "Work Experience", content: "Add your Work Experience" },
  ];


  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#028A0F",
      height: "4px"
    }),
    ActiveNode: () => ({
      backgroundColor: "#028A0F",
    }),
    CompletedNode: () => ({
      backgroundColor: "red",
    })
  }


  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-center p-5 text-2xl font-bold">Sign-Up Form</h1>
      <div className="flex flex-wrap mx-28 h-full">
        <Stepper steps={steps} />
      </div>
    </div>

  )
};

export default SignUp;
