'use client'

import useEditTodo from '@/hooks/useEditTodo';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DialogBase from './dailog';
import useTodoId from '@/hooks/useTodoId';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { editTodo } from '@/server/action';
import { useRouter } from 'next/navigation';

export default function EditTodo() {
  const queryclient = useQueryClient()
    const router = useRouter()
    const body = useTodoId((state) => state.body)
    const id = useTodoId((state) => state.id)
    useEffect(()=>{
        setTodo(body)
    },[body])
    const [todo, setTodo]= useState('')
    const editModal =  useEditTodo()
    const mutation = useMutation({mutationFn:editTodo,onSuccess:()=>{
      queryclient.invalidateQueries({queryKey:['todos']})
      queryclient.invalidateQueries({queryKey:['todo']})

    }})
    
    const submitHandler =async(e)=>{
        mutation.mutate({id,todo})
        // console.log(mutation)
          if (mutation.isSuccess) {
            toast.success("ویرایش شد")
            setTodo("")
            setTimeout(()=>{editModal.onClose()},1000)
          }
          if(mutation.error){
            toast.error("ویرایش نا موفق")
        }

    }
    
    
  return (
    <>
      <DialogBase
      title="ویرایش یادداشت" 
      open={editModal.isOpen} 
      onClose={editModal.onClose}
      value={todo}
      onChange={(e)=>setTodo(e.target.value)}
      submitHandler={submitHandler}
      buttonText = "ویرایش"
       />

    </>
  );
}

