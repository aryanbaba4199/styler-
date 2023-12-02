import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import CartPage from "@/components/CartPage/CartPage";
import Empty from "@/components/CartPage/Empty";
import { useAppSelector } from "@/redux/hooks";
import { getSession } from "next-auth/react";
import db from "@/utils/db";



const Cart = () => {
    const { cart } = useAppSelector((state: any) => ({ ...state }));
    
    return (
        <>
            <Header />
            <main className="w-full h-screen">
                {cart.cartItems.length > 0 ? (
                    <CartPage cart={cart}/>
                ) : (
                    <Empty />
                )}
            </main>
            <MenuSideBar />
        </>
    );
};

export default Cart;

export async function getServerSideProps(context: any) {
    await db.connectDb();
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
            },
        };
    }
    return {
        props: {},
    };
}
