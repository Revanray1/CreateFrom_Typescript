"use client";
import React from "react";
import HomeIcon from "../../../public/home.svg";


const HomePageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div>
        <section className="flex banner_color_grad h-100vh">
          <div className=" w-full">
            <div className="flex h-full flex-wrap items-center justify-center lg-screen-2560-justify-between ">
              <div className="mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img
                  src={`https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp`}
                  className="w-full"
                  alt="Sample image"
                />
              </div>
              {children}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default HomePageLayout;
