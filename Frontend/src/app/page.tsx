"use client";
import React from "react";
import Link from "next/link";
import HomeIcon from "../../public/home.svg"; 
import HomePageLayout from "@/components/customComponents/HomepageLayout";


export default function HomePage() {
  return (
    <>
      <HomePageLayout >
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 ">
              <div className="flex flex-row items-center justify-center mb-24">
                <HomeIcon width={30} height={30} />
                <h3 className="font-kanit text-center  text-xl text-bold text-slate-200 m-2">
                  Welcome to Home Page
                </h3>
              </div>
              <div className="text-center">
                <div className="font-sofadi_one text-2xl text-slate-200 ">
                  Create Your Form Or Review your Form Here
                </div>
              </div>
              <div className="my-4  items-center ">
                <div className="flex justify-evenly mt-6">
                  <Link
                    className="border border-gray-400 rounded-md h-10 w-32 bg-green-500 text-white text-center no-underline inline-block py-2"
                    href="/signIn"
                  >
                    Sign-In
                  </Link>
                  <Link
                    className="border border-gray-400 rounded-md h-10 w-32 bg-blue-500 text-white text-center no-underline inline-block py-2"
                    href="/signUp"
                  >
                    Sign-Up
                  </Link>
                </div>
              </div>
            </div>
      </HomePageLayout>
    </>
  );
}
