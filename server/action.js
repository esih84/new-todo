"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { redirect } from "next/navigation";
import {serverAuthJson} from "@/utils/serverAuth";




export const fetchTodos = async({take=5, PageNumber=1})=>{
  try {
    const {currentUser}=await serverAuthJson()
    // console.log(currentUser[0])
    // http://localhost:4000/users/2?_embed=todos
    // http://localhost:4000/todos?_page=2&_limit=5
    // http://localhost:4000/todos?userId=1&_page=2&_limit=4
    let fetchtodos = await fetch(`http://localhost:4000/todos?userId=${currentUser[0].id}&_page=${PageNumber}&_limit=${take}`)
    if (!fetchtodos.ok) {  
      throw new Error("مشکلی پیش آمده")
      
    }
    const todos = await fetchtodos.json()
    const fetchTotal = await fetch(`http://localhost:4000/todos?userId=${currentUser[0].id}&_order=desc`)
    if (!fetchTotal.ok) {  
      throw new Error("مشکلی پیش آمده")
      
    }
    const total = await fetchTotal.json()
    revalidatePath('/')
    return {
      data : todos,
      metadata:{
          hasNextPage: PageNumber < Math.ceil(total.length/take),
          totalPage : Math.ceil(total.length/take)
      }
  }
  } catch (error) {
    // console.log(error)
    throw new Error('مشکلی پیش آمده است')
  }



}

// export const fetchTodo = async(todoId)=>{
//   try {
//     let fetchtodo = await fetch(`http://localhost:4000/todos/${todoId}`)
//     const todo = await fetchtodo.json()
//     // console.log(todo)
//     return todo
    
//   } catch (error) {
//     throw new Error('مشکلی پیش آمده است')
    
//   }
// }

// export const deleteTodoJson = async (id) => {
//   try {
//     const res = await fetch(`http://localhost:4000/todos/${id}`,{
//       method:"DELETE",
//       headers:{
//         'Content-Type': 'application/json'
//       },
//     })
//     if (!res.ok) {  
//       return {status:"failed"}
      
//     }
//     // revalidateTag('/')
//     // revalidatePath('/')
//     // redirect('/')
    
//   } catch (error) {
//     console.log(error)
//     return {status:"failed"}

//     // throw new Error('مشکلی پیش آمده است')
    
//   }

// };



// export const addUser = async(email,username,hashedPassword)=>{
//   const res =await fetch(`http://localhost:4000/users`,{
//     method:"POST",
//     headers:{
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({username,email,hashedPassword})
//   })
//  const newUser = await res.json() 
//   return newUser
// }

export const addTodo = async(todo)=>{
  try {

  const {currentUser} = await serverAuthJson()
    // console.log(currentUser)
  const res =await fetch(`http://localhost:4000/todos`,{
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body:todo,userId:currentUser[0].id})
  })
  if (!res.ok) {  
    throw new Error("مشکلی پیش آمده")
    
  }
  const data = await res.json()
  return {...data}
}catch (error) {
    // console.log(error)
    throw new Error(error.message)
    
  }
}
// export const editTodo = async (id,body) => {
//   try{

//     const res =await fetch(`http://localhost:4000/todos/${id}`,{
//       method:"PATCH",
//       headers:{
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({body})
//     })
//     if (!res.ok) {  
//       return {status:"failed"}
      
//     }
//   revalidatePath("/");
// }catch{
//   return({status:"failed"})
// } 
// };