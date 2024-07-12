import './App.css'
import Navbar from './Component/Navbar'
import { IoSearchSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import {collection,  getDocs, onSnapshot} from "firebase/firestore"
import { db } from './Conflig/Firebase';
import Contact from './Component/Contact';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Forms from './Component/Forms';
import useDisclouse from './Hooks/useDisclouse';
import NotFound from './Component/NotFound';

function App() {

const [contact,setContact]=useState([]);
const {onClose,onopen,isopen}=useDisclouse()


useEffect(()=>{
  // const getContacts = async() => {
  const getContacts =() => {
try {

  const contactsRef = collection(db,"Contacts");
  // const contactsSnapshot = await getDocs(contactsRef);
  onSnapshot(contactsRef,(snapshot)=>{

    const contactLists = snapshot?.docs?.map((doc)=>{
      return{
        id:doc?.id,
        ...doc?.data(),
      }
    })
    setContact(contactLists)
    return contactLists;
    // console.log(contactLists);
  })
  // console.log("after");
  // console.log(contactsRef);
  
} catch (error) {
  
}
  }
  getContacts();
},[]);
const filter = (e)=>{
  const value = e.target.value;
  const contactsRef = collection(db,"Contacts");
  // const contactsSnapshot = await getDocs(contactsRef);
  onSnapshot(contactsRef,(snapshot)=>{

    const contactLists = snapshot?.docs?.map((doc)=>{
      return{
        id:doc?.id,
        ...doc?.data(),
      }
    })
    const filterdContacts = contactLists?.filter(contact=> contact.name.toLowerCase().includes(value.toLowerCase()))
    setContact(filterdContacts)
    return filterdContacts;
  })
}
  return (
    <>
    
    <div className='max-w-[400px] mx-auto px-4' >
      <Navbar/>
      <div className='flex relative items-center gap-2 ' >
      <IoSearchSharp className='ml-4 text-white text-xl absolute ' />
      
        <input onChange={filter } type="text" className='bg-transparent pl-12 text-xl flex-grow border  border-solid border-white rounded-lg text-white  h-10' placeholder='Search Contact' />
        <div className='w-[52px]h-[52px] '><FaCirclePlus onClick={onopen} className='text-white text-5xl cursor-pointer' /></div>
        
     </div>
<div className='my-4 gap-3 flex flex-col'>{contact.length <=  0 ? <NotFound/>  :contact.map((contact)=> 
<Contact key={contact?.id} contact={contact}/>
)}</div>

    </div>
   <Forms isopen={isopen} onClose={onClose}/>

<ToastContainer position={`top-center`} className={ `text-white`}/>
    </>
  )
}

export default App
