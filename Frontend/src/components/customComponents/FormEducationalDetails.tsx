
import React from 'react';
import { EducationDetailsProps } from '../../interfaces/index'
import { EDUCATION } from '@/constants/label';

const EducationDetails: React.FC<EducationDetailsProps> = ({
  formData,
  handleInputChange,
  addEducation,
  errors,
  nextStep,
  prevStep,
  handleDeleteFields
}) => {
  return (
    <form className="space-y-4">
      {formData.education.map((education, index) => (
        <div key={index + '-edu-detail'}>
          <div  >
            <div className='flex '>
              <div className="w-9/12" >
                <h3>Educational Details - {index + 1}</h3>
              </div>
              <div className='w-3/12'>
                <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-red-500 text-white text-center no-underline   items-center' onClick={() => handleDeleteFields(index, EDUCATION)}>Delete</button>

              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter School or College name :</label>
              <input
                type="email"
                id="collegeName"
                name="collegeName"
                placeholder="College Name"
                value={education.collegeName}
                onChange={(e) => handleInputChange(e, index, 'collegeName', 'education')}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              />
              {errors[`collegeName${index}`] && <p style={{ color: 'red' }}>{errors[`collegeName${index}`]}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="joinedOnYear" className="block text-sm font-medium text-gray-700">From :</label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="date"
                  name="joinedOnYear"
                  placeholder="joined On Year"
                  value={education.joinedOnYear}
                  onChange={(e) => handleInputChange(e, index, 'joinedOnYear', 'education')}
                />

                {errors[`joinedOnYear${index}`] && <p style={{ color: 'red' }}>{errors[`joinedOnYear${index}`]}</p>}


              </div>
              <div>
                <label htmlFor="completedYear" className="block text-sm font-medium text-gray-700">To :</label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="Date"
                  name="completedYear"
                  placeholder="Completed Year"
                  value={education.completedYear}
                  onChange={(e) => handleInputChange(e, index, 'completedYear', 'education')}
                />

                {errors[`completedYear${index}`] && <p style={{ color: 'red' }}>{errors[`completedYear${index}`]}</p>}

              </div>
            </div>

          </div>
          <hr className='horizontaline' />
        </div>
      ))}
      <div>
        <button type="button" className='border border-gray-400 rounded-md h-6 w-64 bg-blue-500 text-white text-center no-underline   items-center	' onClick={addEducation}> + Add More Education</button>
      </div>

      <div className='float-right'>
        <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline   items-center mx-5' onClick={prevStep}>Back</button>
        <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline   items-center' onClick={nextStep}>Continue</button>
      </div>
    </form>

  );

};



export default EducationDetails;