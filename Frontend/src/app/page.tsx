import React from 'react'
import Link from 'next/link';


export default function HomePage(){
  return (<>
    <div className="text-center p-12">
      Welcome to Home Page
      </div>
    <div className="flex justify-around p-12">
    <Link className="border border-gray-400 rounded-md h-10 w-32 bg-green-500 text-white text-center no-underline inline-block py-2" href="/signIn">
        Sign-In

    </Link>
    <Link className="border border-gray-400 rounded-md h-10 w-32 bg-blue-500 text-white text-center no-underline inline-block py-2" href="/signUp">
        Sign-Up

    </Link>

  
    </div>
    </>)
}
