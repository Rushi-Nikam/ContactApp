import React from 'react'
import {Formik,Form, Field, ErrorMessage} from "formik"
import NewContact from './NewContact'
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../Conflig/Firebase";
import { toast } from 'react-toastify';
import * as Yup from "yup"
const contactSchemaValidation= Yup.object().shape({
  name:Yup.string().required("Name is required"),
  email:Yup.string().email("Invalid Email").required("Email is required"),
  PNumber:Yup.number().required("Number is required"),
})
const Forms = ({isopen,onClose,isUpdate,contact}) => {
  const addContact = async (contact)=>{

    try {
      const contactRef = collection(db,"Contacts");
      await addDoc(contactRef,contact)
        onClose();
        toast.success("contact Added Successfully");
    } catch (error) {
    console.log("Error"+error);  
    }
  };
  const updatecontact = async (contact,id)=>{

    try {
      const contactRef = doc(db,"Contacts",id);
      await updateDoc(contactRef,contact);
      toast.success("contact updated Successfully");
      onClose();
      // console.log("contact added succes")
  
    } catch (error) {
    console.log("Error"+error);  
    }
  }


  return (
    <div>
         <NewContact isOpen={isopen} onClose={onClose}>
  <Formik  validationSchema={contactSchemaValidation}
  initialValues={isUpdate
  ?{
    name:contact?.name,
    email:contact?.email,
    PNumber:contact?.PNumber,

  }
  :{
    name:"",
    email:"",
    PNumber:"",

  }}

 onSubmit={(values)=>{
    console.log(values)
    isUpdate ? updatecontact(values,contact?.id):
    addContact(values);

  }}
  >
<Form className='flex flex-col' >
  <div className='flex flex-col gap-1'>
  <label htmlFor='name'>Name</label>
    <Field  name="name" className="h-10 border"/>
    <div className='text-xs text-red'>
      <ErrorMessage name="name" />
    </div>
    </div>
    <div className='flex flex-col gap-1'>
  <label htmlFor='email'>Email</label>
    <Field  name="email" className="h-10 border"/>
    <div className='text-xs text-red'>
      <ErrorMessage name="email" />
    </div>
    </div>
    <div className='flex flex-col gap-1'>
  <label htmlFor='PNumber'>Number</label>
    <Field  name="PNumber" className="h-10 border"/>
    <div className='text-xs text-red'>
      <ErrorMessage name="PNumber" />
    </div>
    </div>

    <button className='bg-orange px-3 py-1.5 border rounded-md self-end mt-10'>{isUpdate ? "Update":"Add " } Button</button>
    
</Form>
  </Formik>
    </NewContact>
    </div>
  )
}

export default Forms