import React, { useState } from 'react'

const useDisclouse = () => {
    const [isopen,setOpen]=useState(false)

    const onopen =()=>{
      setOpen(true);
    }
    const onClose=()=>{
      setOpen(false);
    }
  return{onClose,onopen,isopen};
}

export default useDisclouse