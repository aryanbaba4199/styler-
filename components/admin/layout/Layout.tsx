import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }: any) => {
    return (
        <div className="flex min-h-screen p-2" >
            <div className="w-full md:pr-8">{children}</div>
            <Sidebar />
        </div>
    );
};

export default Layout;

