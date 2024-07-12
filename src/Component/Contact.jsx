
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { TbEditCircle } from "react-icons/tb";
import { SiNamecheap } from "react-icons/si";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Conflig/Firebase';
import Forms from './Forms';
import useDisclouse from '../Hooks/useDisclouse';
import { toast } from "react-toastify";
const Contact = ({contact}) => {
  const {isopen,onopen,onClose}=useDisclouse()


  const deleteContact = async(id)=>{
    try {
       await deleteDoc(doc(db,"Contacts",id));
       toast.success("contact deleted")
    } catch (error) {
      console.log("Error"+error);
    }

  }
  return (
    <div><div key={contact?.id} className='bg-yellow flex gap-1  rounded-[8px] justify-between items-center py-3 '>
    <div className='flex gap-1 cursor-pointer '> <HiOutlineUserCircle className='text-orange text-5xl '/>
     <div >
       <h2 className=' flex font-bold gap-1 text-xl'><SiNamecheap />{contact?.name}</h2>
       <p className='flex gap-1 text-sm'><MdOutlineMarkEmailRead />{contact?.email}</p>
       <p className='flex gap-1 text-sm'><GiSmartphone/>{contact?.PNumber}</p>
     </div></div>
     <div className='flex'>
       <TbEditCircle onClick={onopen}  className='text-3xl cursor-pointer text-[#5A5959]'/>
     <IoMdTrash onClick={()=>deleteContact(contact?.id)} className='text-3xl cursor-pointer text-[#5F00D9]' />
     </div>
   </div>
   <Forms contact={contact} isUpdate isopen={isopen} onClose={onClose}/>
   </div>
  )
}

export default Contact