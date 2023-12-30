import Header from "@/components/layouts/Header";
import { Toaster } from "react-hot-toast";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <Toaster/>
            {children}
        </>
    );
}

export default Layout;