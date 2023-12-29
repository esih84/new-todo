
// import Home from "@/components/templates/Home";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import { fetchTodos } from "@/server/action";
import Todos from "@/components/templates/Todos";

// import { useQuery } from "react-query";
// import serverAuth from "@/utils/serverAuth";

export default async function Home({searchParams,searchParams:{query}}) {

  const session = await getServerSession(authOptions)
  if (!session)redirect('/SignIn')

  const PageNumber = Number(searchParams?.page) || 1;

  const take =5

  const initialData= await fetchTodos({take, PageNumber})
  // console.log({data, metadata})
  return (
    <Container  maxWidth="lg" >
        <Todos take={take} PageNumber={PageNumber} initialData={initialData} query={query}/>
    </Container>
);
}
