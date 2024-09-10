import React from 'react'
import {BasicDetailsProps} from '../../interfaces'

const BasicDetailsForm: React.FC<BasicDetailsProps> = ({ formData, handleInputChange, errors, nextStep }) => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <div className="mt-1 space-y-2 ">
          <label className="inline-flex items-center pr-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>
        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}

      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
          maxLength={10}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
      </div>
      <div className='float-right	 '>
        <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline   items-center' onClick={nextStep}>Continue</button>
      </div>
    </form>
  )
}

export default BasicDetailsForm;