
import React from 'react';
import { WorkExperienceDetailsProps } from "../../interfaces/index"
import { WORK_EXPERIENCE } from '@/constants/label';

const WorkExperienceDetails: React.FC<WorkExperienceDetailsProps> = ({
    formData,
    handleInputChange,
    addWorkExperience,
    errors,
    prevStep,
    nextStep,
    handleDeleteFields
}) => {
    return (

        <form className="space-y-4">
            {formData.workExperience.map((work, index) => (<>
                <div key={index + '-form-detail'} >
                    <div className='flex '>
                        <div className="w-9/12" >
                            <h3>Work Details - {index + 1}</h3>
                        </div>
                        <div className='w-3/12'>
                            <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-red-500 text-white text-center no-underline   items-center' onClick={() => handleDeleteFields(index, WORK_EXPERIENCE)}>Delete</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder="Company Name"
                            value={work.companyName}
                            onChange={(e) => handleInputChange(e, index, 'companyName', 'workExperience')}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors[`companyName${index}`] && <p style={{ color: 'red' }}>{errors[`companyName${index}`]}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="workJoinedYear" className="block text-sm font-medium text-gray-700">From :</label>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="date"
                                name="workJoinedYear"
                                placeholder="joined On Year"
                                value={work.workJoinedYear}
                                onChange={(e) => handleInputChange(e, index, 'workJoinedYear', 'workExperience')}
                            />
                            {errors[`workJoinedYear${index}`] && <p style={{ color: 'red' }}>{errors[`workJoinedYear${index}`]}</p>}
                        </div>
                        <div>
                            <label htmlFor="workRelievedYear" className="block text-sm font-medium text-gray-700">To :</label>
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="date"
                                name="workRelievedYear"
                                placeholder="Fcompleted Year"
                                value={work.workRelievedYear}
                                onChange={(e) => handleInputChange(e, index, 'workRelievedYear', 'workExperience')}
                            />
                            {errors[`workRelievedYear${index}`] && <p style={{ color: 'red' }}>{errors[`workRelievedYear${index}`]}</p>}
                        </div>
                    </div>
                </div>
                <hr className='horizontaline' />
            </>))}
            <div>
                <button type="button" className='border border-gray-400 rounded-md h-6 w-64 bg-blue-500 text-white text-center no-underline   items-center	' onClick={addWorkExperience}> + Add More Experience</button>
            </div>

            <div className='float-right'>
                <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline   items-center mx-5' onClick={prevStep}>Back</button>
                <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline   items-center ' onClick={nextStep}>Submit</button>
            </div>


        </form>

    );

};



export default WorkExperienceDetails;