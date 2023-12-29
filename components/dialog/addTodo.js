'use client'

import useTodo from '@/hooks/useAddTodo';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DialogBase from './dailog';

export default function AddTodo() {
    const router = useRouter()
    const [todo, setTodo]= useState("")
    const addModal =  useTodo()
    // console.log(todo)
    const submitHandler =async(e)=>{
        e.preventDefault()


    }
    
    
  return (
    <>
      <DialogBase 
      title="اضافه کردن یادداشت" 
      open={addModal.isOpen} 
      onClose={addModal.onClose}
      value={todo}
      onChange={(e)=>setTodo(e.target.value)}
      submitHandler={submitHandler}
      buttonText = "ایجاد"
       />

    </>
  );
}


