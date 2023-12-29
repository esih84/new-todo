'use client'
import Loading from "@/modules/Loading"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Home() {
  // const {data:todosData,isLoading}= useQuery({
  //   queryKey:['todos'],
  //   queryFn: ()=>
  //   axios.get(" http://localhost:4000/todos").then(res=>res.data),
  // })
  // console.log(todosData)
  // if (isLoading) {
  //   return(
  //     <div className=" flex items-center justify-center min-h-dvh">
  //       <Loading/>
  //     </div> 
  //   )
  // }
  return (
    <div>
      <h1>todoApp</h1>
      <div>
        {/* {todosData?.map(todo=>(
          <h4 key={todo.id}>{todo.body}</h4>
        ))} */}
      </div>
    </div>
  )
}
