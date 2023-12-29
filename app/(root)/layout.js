import Header from "@/components/layouts/Header";

const Layout = ({children}) => {
    return (
        <>
            <Header/>

            {children}
        </>
    );
}

export default Layout;