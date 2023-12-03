import CarouselContainer from "@/components/Home/CarouselContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import Product from "@/models/Product";
import Category from "@/models/Category";
import HomeProductSwiper from "@/components/Home/HomeProductSwiper";
import CategoriesProduct from "@/components/Home/CategoriesProduct/CategoriesProducts";
import db from "../utils/db";
import { NextSeo } from "next-seo";

export default function Home({ products }: any) {
    return (
        <>
            <Header title="Stylers" />
            <NextSeo
                title="Stylers.in"
                description="Explore our latest collection of fashion items. Find the perfect style for every occasion."
            />
            <main className="max-w-screen-2xl mx-auto bg-gray-100">
                <CarouselContainer />
                <CategoriesProduct products={products} />
                <div className="z-10 relative">
                    <HomeProductSwiper products={products} category="Jeans" />
                    <HomeProductSwiper products={products} category="Jacket" />
                    <HomeProductSwiper products={products} category="T-Shirts" />
                    <HomeProductSwiper products={products} category="Shirt" />
                </div>
            </main>
            <Footer />
            <MenuSideBar />
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    try {
        await db.connectDb();

        const products = await Product.find()
            .populate({ path: "category", model: Category })
            .sort({ updatedAt: -1 })
            .lean();

        return {
            props: {
                products: JSON.parse(JSON.stringify(products)),
            },
        };
    } catch (error) {
        console.error("Error fetching product data:", error);
        return {
            props: {
                products: [],
            },
        };
    } 
};

