import React from "react";
import Button from "../../components/customComponents/Button";
import { EmailcomponentProps } from "@/interfaces";
import { SIGN_IN } from "@/constants/label";

const EmailComponent: React.FC<EmailcomponentProps> = ({
  EmailFormData,
  handleInputChange,
  emailErrors,
  loader,
  handleSubmit,
  errorMessage,
}) => {
  return (
      <div className="animation">
      <div className="mb-2">
        {errorMessage !== "" && (
          <div className="text-center text-white block">{errorMessage}</div>
        )}
      </div>
      <div className=" bg-white p-8 rounded-lg shadow-lg w-[460px] homepage-container email-2xlg-screen-2560-outer-container-width">
        <form className="space-y-4 h-full">
          <div className="grid  gap-4">
            <div>
              <h1 className=" text_top_animation font-kanit text-lg sm:text-sm md:text-2xl lg:text-2xl 2xl:text-6xl text-[#484957] font-bold text-center">
                {SIGN_IN}
              </h1>
              <label
                htmlFor="firstName"
                className="font-kanit text-start text-bold"
              >
                Enter Your Email
              </label>

              <div className="flex justify-center mt-4">
                <input
                  className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-2  leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 stroke-2 "
                  type="email"
                  name="email"
                  placeholder="Enter Your E-mail Id"
                  value={EmailFormData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-center mt-4">
                {emailErrors.email && (
                  <p style={{ color: "red" }}>{emailErrors.email}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-52">
            {loader ? (
              <Button />
            ) : (
              <button
                type="button"
                className="border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline items-center"
                disabled={loader}
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailComponent;
