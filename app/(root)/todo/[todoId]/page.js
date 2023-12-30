'use client'

import { Card, CardActions, CardContent, Checkbox,Container,Typography } from '@mui/material';
import axios from "axios";
import Loading from "@/modules/Loading";
import { useQuery } from "@tanstack/react-query";
import Buttons from "@/modules/Buttons";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const TodoDetail = ({params:{todoId}}) => {
  const router = useRouter()
  const {data:user}= useSession()
  if(!user){
      router.push('/SignIn')
  }
    // console.log(todoId)


    const {data,isLoading}= useQuery({
      queryKey:['todo',todoId],
      queryFn:()=> axios.get(`http://localhost:4000/todos/${todoId}`).then(res=>res.data),
    })
    // console.log(data)
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
                    <Buttons todo={data}/>

                </CardActions>
            </Card>
        </Container>
    );
}

export default TodoDetail;