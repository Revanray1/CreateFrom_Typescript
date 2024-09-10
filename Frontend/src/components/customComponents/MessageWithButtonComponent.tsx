import Link from 'next/link'
import React from 'react'

export default function MessageWithButtonComponent() {
  return (<>
    <div className="text-center text-lg">
    <h1 className="text-green-600">DONE ! </h1>
    <h1 className="text-green-600">Form  Creatde Successfully</h1>
    </div>
      
    <div className='flex justify-evenly  p-4'>
      <Link  className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline   items-center' href="/">Go to Home</Link>
      <Link className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline   items-center' href="/signIn">View Form</Link>
    </div>
    </>
  )
}
