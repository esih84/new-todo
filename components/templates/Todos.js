'use client'
import { Container } from "@mui/material";
// import Todo from "./Todo";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/modules/Loading";
import { fetchTodos } from "@/server/action";
import Todo from "./Todo";
import PaginationButton from "./PaginationButton";

const Todos = ({query,initialData, take, PageNumber, searchParams}) => {
    

    const {data:todosData,isLoading,error}= useQuery({
      queryKey:['todos',take,PageNumber],
      queryFn:()=> fetchTodos({take,PageNumber}),
      initialData: initialData,
      keepPreviousData: true
    })
    let todos =todosData.data

    // console.log(todosData.metadata)
    if (isLoading) {
      return(
        <div className=" flex items-center justify-center min-h-dvh">
          <Loading/>
        </div> 
      )
    }
    if (error) {
        <Container dir="rtl" className=" *:p-3  flex justify-center  p-10 shadow-lg rounded-md   min-h-32  my-12">

        <h3 className=" text-sky-500">{error.message}</h3>
        </Container>
    }
  if (query) {
    todos = todos.filter(todo=>(todo.body.indexOf(query)!= -1 ))
    
  } 
  if (todos.length <1) {
    return(
      <Container dir="rtl" className=" *:p-3  flex justify-center  p-10 shadow-lg rounded-md   min-h-32  my-12">

          <h3 className=" text-sky-500"> یادداشتی وجود ندارد</h3>
      </Container>

    )
  }
    // console.log(todos.length)
    return (
        // max-h-96
        <Container maxWidth="lg">
          <Container  dir="rtl" className=" *:pb-3 *:border-b *:border-b-gray-400  bg-gray-200  p-10 shadow-lg rounded-md min-h-[22rem]    my-12">
              {todos.map(todo=>(
                <Todo todo={todo} key={todo.id}/>
                ))}
          </Container>
            <PaginationButton {...searchParams} {...todosData.metadata} />

        </Container>
    );
}

export default Todos;