'use client'

import { Button } from "@mui/material";
import useEditTodo from "@/hooks/useEditTodo";

import useTodoId from "@/hooks/useTodoId";

const Buttons = ({todo}) => {

    const editModal =  useEditTodo()
    const setBody = useTodoId((state) => state.setBody)

    const setId = useTodoId((state) => state.setId)

    //    await deleteTodo(todo.id)
    return (
        <>


                <Button variant="outlined" size="small" color="error" >
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