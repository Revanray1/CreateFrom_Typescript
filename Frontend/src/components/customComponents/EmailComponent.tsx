import React from 'react'
import Button from '../../components/customComponents/Button'
import {EmailcomponentProps} from '@/interfaces'

const EmailComponent:React.FC<EmailcomponentProps>=({
    EmailFormData,
    handleInputChange,
    emailErrors,
    loader,
    handleSubmit
    
})=>{
  return (
    <div className='h-96 bg-white p-8 rounded-lg shadow-lg w-full ' ><form className="space-y-4 h-full">
          <div className="grid  gap-4">
            <div>
              <div className='flex justify-center'>

                <label htmlFor="firstName" className="text-lg sm:text-sm md:text-2xl lg:text-2xl 2xl:text-6xl ">Enter Your Email</label>
              </div>

              <div className='flex justify-center mt-4'>
                <input
                  className="block w-2/4 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  type="email"
                  name="email"
                  placeholder="Enter Your E-mail Id"
                  value={EmailFormData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='flex justify-center mt-4'>

                {emailErrors.email && <p style={{ color: 'red' }}>{emailErrors.email}</p>}
              </div>
            </div>

          </div>
          <div className='flex justify-center mt-52'>
            {loader ? <Button /> :
              <button type="button" className='border border-gray-400 rounded-md h-8 w-24 bg-blue-500 text-white text-center no-underline items-center' disabled={loader} onClick={handleSubmit}>Submit</button>}
          </div>
        </form>
        </div>
  )
}

export default EmailComponent