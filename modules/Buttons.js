'use client'

import { Button } from "@mui/material";
import useEditTodo from "@/hooks/useEditTodo";

import useTodoId from "@/hooks/useTodoId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/server/action";
import toast from "react-hot-toast";

const Buttons = ({todo}) => {
    const queryclient = useQueryClient()

    const editModal =  useEditTodo()
    const setBody = useTodoId((state) => state.setBody)

    const setId = useTodoId((state) => state.setId)
    
    const mutation = useMutation({mutationFn:deleteTodo,onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['todos']})  
      }})
      
    const deleteHandler =(e)=>{
        mutation.mutate(todo.id)
        // console.log(mutation)
        if (mutation.isSuccess) {
            toast.success("حذف شد")
            }
            if(mutation.error){
              toast.error("حذف نا موفق")
        }
      }
      
    return (
        <>


                <Button onClick={deleteHandler} variant="outlined" size="small" color="error" >
                حذف
                </Button>
            
            <Button onClick={()=>(
                editModal.onOpen(),
                setBody(todo.body),
                setId(todo.id)

            )} variant="outlined" size="small" color="info" >
                ادیت
            </Button>
        </>
    );
}

export default Buttons;