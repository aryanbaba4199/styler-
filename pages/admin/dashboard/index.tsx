import Layout from "@/components/admin/layout/Layout";


const Dashboard = () => {
    return (
        <>


            <Layout>

                <div className=" w-full  bg-gray-800 content-center p-4 text-white">
                    <h1 className="text-2xl text-center font-bold">Welcome Admin!</h1>
                    <p className="mt-2 text-center">You have access to the admin dashboard.</p>
                </div>
            </Layout>
        </>

    );
}

export default Dashboard;
