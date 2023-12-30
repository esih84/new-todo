'use client'

import useTodo from '@/hooks/useAddTodo';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DialogBase from './dailog';
import { addTodo } from '@/server/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddTodo() {
  const queryClient = useQueryClient()
    const router = useRouter()
    const [todo, setTodo]= useState("")
    const addModal =  useTodo()
    // console.log(todo)
    const mutation = useMutation({mutationFn:addTodo,
      onSuccess:()=>{
      toast.success("یادداشت ایجاد شد")
      setTimeout(()=>addModal.onClose(),1000)
      setTodo("")
      queryClient.invalidateQueries({queryKey:['todos']})
    }})
    const submitHandler =async(e)=>{
        e.preventDefault()

        mutation.mutate(todo)
        console.log(mutation)

        if(mutation.error){
            toast.error("مشکلی پیش آمده")
          }

        // }
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


