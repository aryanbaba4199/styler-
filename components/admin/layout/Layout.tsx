import Sidebar from "../sidebar/Sidebar";
import Header from "@/components/Header/Header";

const Layout = ({ children }: any) => {
    return (
        <>
        <Header />
        <div className="flex min-h-screen p-2" >
            <div className="w-full md:pr-8">{children}</div>
            <Sidebar />
        </div>
        </>
    );
};

export default Layout;

