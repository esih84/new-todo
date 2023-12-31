import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const serverAuthJson = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("لطفا وارد حساب کاربری خود بشوید")
  
    }
    const res = await fetch(`http://localhost:4000/users?email=${session.user.email}`)
  
    const currentUser = await res.json()
    // console.log(currentUser)
    if (!currentUser) {
      throw new Error("لطفا وارد حساب کاربری خود بشوید")
    }
    return { currentUser };
  };
  