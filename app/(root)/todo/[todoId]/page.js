'use client'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardActions, CardContent, Checkbox,Container,Typography } from '@mui/material';
import axios from "axios";
import Loading from "@/modules/Loading";
import { useQuery } from "@tanstack/react-query";


const TodoDetail = ({params:{todoId}}) => {
    // console.log(todoId)


    const {data,isLoading}= useQuery({
      queryKey:['todo',todoId],
      queryFn:()=> axios.get(`http://localhost:4000/todos/${todoId}`).then(res=>res.data),
    })
    console.log(data)
    if (isLoading) {
      return(
        <div className=" flex items-center justify-center min-h-dvh">
          <Loading/>
        </div> 
      )
    }    
    return (
        <Container maxWidth="lg"  dir="rtl" className=" *:p-3 p-10  min-h-fit  my-12">
            <Card sx={{ maxWidth: '100%' }}>
                <CardContent>

                <Typography variant="h6" color="secondary">
                    {data.body}
                </Typography>
                </CardContent>
                <CardActions dir="ltr" >
                </CardActions>
            </Card>
        </Container>
    );
}

export default TodoDetail;