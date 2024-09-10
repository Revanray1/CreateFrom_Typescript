import React from 'react'
import { ViewFormDetailsProps } from '../../interfaces'

const ViewForm: React.FC<ViewFormDetailsProps> = ({
  userData
}) => {
  return (
    <div className="h-full bg-blue-500 py-4 rounded-md px-3">
      <div className='grid grid-cols-2 gap-4 bg-white min-h-10 border ' >
        <div className='text-center font-bold'>First Name   </div>
        <div className='text-center border-l-2  border-grey'>{userData.firstName}</div>
      </div>
      <div className='grid grid-cols-2 gap-4  bg-white  min-h-10 border' >
        <div className='text-center font-bold'>Last Name   </div>
        <div className='text-center border-l-2  border-grey'>{userData.lastName}</div>
      </div>
      <div className='grid grid-cols-2 gap-4  bg-white  min-h-10 border  ' >
        <div className='text-center font-bold'>Gender   </div>
        <div className='text-center border-l-2  border-grey'>{userData.gender}</div>
      </div>

      <div className='grid grid-cols-2 gap-4  bg-white  min-h-10 border ' >
        <div className='text-center font-bold' >Phone Number   </div>
        <div className='text-center overflow-x-auto border-l-2  border-grey'>{userData.phoneNumber}</div>
      </div>
      <div className='grid grid-cols-2 gap-4  bg-white  min-h-10 border' >
        <div className='text-center font-bold'>Email   </div>
        <div className='text-center truncate hover:text-clip border-l-2  border-grey'>{userData.email}</div>
      </div>

      {userData.education.length > 0 &&
        <div className='grid grid-cols-2 gap-4 min-h-52 bg-white h-52 border'>
          <div className='text-center font-bold'>Education Details</div>

          <div className='text-center border-l-2  border-grey overflow-scroll no-scrollbar'>{userData.education?.map((data, index) => (<>
            <div className='m-6 ' key={index + "edu"}>
              <div className='font-bold text-blue-500'>Details :{index + 1}</div>
              <hr className='horizontaline' />
              <div className='overflow-x-scroll no-scrollbar'>
                <div className='grid grid-cols-2 gap-4 mx-16'><div className='font-bold' >College Name </div> <div>{data.collegeName}</div></div>
                <div className='grid grid-cols-2 gap-4 mx-16'><div className='font-bold' >From</div> <div>{data.joinedOnYear}</div></div>
                <div className='grid grid-cols-2 gap-4 mx-16'><div className='font-bold' >To </div> <div>{data.completedYear}</div></div>
              </div>
            </div>
          </>))}
          </div>
        </div>}

      {userData.workExperience.length > 0 &&
        <div className='grid grid-cols-2 gap-4 min-h-52 bg-white h-52 border' >
          <div className='text-center font-bold'>Work Details</div>
          <div className='text-center border-l-2  border-grey overflow-scroll no-scrollbar'>{userData.workExperience?.map((data, index) => (<>
            <div className='m-6' key={index + "work"}>
              <div className='font-bold text-blue-500'>Details :{index + 1}</div>
              <hr className='horizontaline' />

              <div className='overflow-x-scroll no-scrollbar'>
                <div className='grid grid-cols-2 gap-4 mx-16 '><div className='font-bold'>Company Name </div> <div>{data.companyName}</div></div>
                <div className='grid grid-cols-2 gap-4 mx-16'><div className='font-bold'>From</div> <div>{data.workJoinedYear}</div></div>
                <div className='grid grid-cols-2 gap-4 mx-16'><div className='font-bold'>To </div> <div>{data.workRelievedYear}</div></div>
              </div>
            </div>
          </>))}</div>
        </div>
      }
    </div>
  )
}

export default ViewForm