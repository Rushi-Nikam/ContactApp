import React from 'react'
import {AiOutlineClose} from "react-icons/ai";
import {createPortal} from "react-dom"

const NewContact = ({onClose,isOpen,children}) => {
  return createPortal(
    <>
    {isOpen && <div className=' grid place-items-center backdrop-blur h-screen w-screen absolute top-0 z-40'>
      <div className=" m-auto z-50 relative min-h-[200px] bg-white min-w-[80%] p-4">
      <div className='flex justify-end'>
        <AiOutlineClose onClick={onClose}  className='text-2xl cursor-pointer'/>
      </div>
      {children}
      </div>
      
      </div>}
    </>
  , document.getElementById('model-root'))
}

export default NewContact