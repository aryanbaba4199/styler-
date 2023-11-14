import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
    HeartIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import AccoridanProduct from "./AccoridanProduct";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, emptyCart, updateCart } from "../../redux/slices/CartSlice";
import { useSession, signIn } from "next-auth/react";
import { showDialog } from "@/redux/slices/DialogSlice";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Infos = ({ product, setActiveImg }: any) => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState(router.query.size);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    const { cartItems: cart } = useAppSelector((state: any) => state.cart);
    // console.log("cart: ", cart);
    useEffect(() => {
        setSize("");
        setQty(1);
    }, [router.query.style]);

    useEffect(() => {
        if (qty > product.quantity) {
            setQty(product.quantity);
        }
    }, [router.query.size]);

    // --------------Buy Now Handler --------------------------------
    const buyNow = async () => {
        addToCartHandler();
        router.push("/cart");
    };


    //----------Cart Handler ---------------
    const addToCartHandler = async () => {
        setLoading(true);
        if (!router.query.size) {
            setError("Please Select a size");
            setLoading(false);
            return;
        }
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
        );

        if (qty > data.quantity) {
            setError(
                "the Quantity you have choosed is more than in stock. Try lower the Qty"
            );
            setLoading(false);
        } else if (data.quantity < 1) {
            setError("this Product is out of stock!");
            setLoading(false);
            return;
        } else {
            let _uid = `${product._id}_${product.style}_${router.query.size}`;
            let exist = cart.find((p: any) => p._uid === _uid);
            if (exist) {
                let newCart = cart.map((p: any) => {
                    if (p._uid == exist._uid) {
                        return { ...p, qty: qty };
                    }
                    return p;
                });
                dispatch(updateCart(newCart));
                setError("");
                setLoading(false);
            } else {
                dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
                setError("");
                setLoading(false);
            }
        }
    };

    

    return (
        <div className="flex flex-col row-span-3 md:col-span-3 max-md:px-2 mb-4">
            <h1 className="text-2xl font-bold ">{product.name}</h1>
            <div className="flex items-center ">
                <span className="cursor-pointer uppercase hover:underline text-sm font-semibold mr-3 text-slate-600">
                    {product.brand}
                </span>
                <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    style={{ color: "#FACF19" }}
                />
                <span className="text-slate-500">
                    ({product.numberReviews}{" "}
                    {product.numberReviews >= 1 ? "reviews" : "review"})
                </span>
            </div>
            <div className="flex w-full bg-slate-200 h-[1px]" />

            <div className="mt-2 flex items-center">
                <div className="text-2xl  text-lime-700">
                    {!size ? `${product.priceRange}` : 
                    <text className=" font-semibold text-lime-600 ">{product.price}</text>
                    }
                </div>

                {product.discount > 0 ? (
                    <div className="ml-2 font-semibold  text-slate-800">
                        {size && (
                            <span className=" text-xl line-through">
                                {product.priceBefore}
                            </span>
                        )}
                        <span className="ml-1 text-blue-500">
                            ({product.discount}%)
                        </span>
                    </div>
                ) : (
                    ""
                )}
            </div>

            <div className="mt-1  text-sm text-slate-500">
                {size
                    ? "Buy 20 Pieces to Ger More Discount"
                    : "Buy More Get More Discount"
                }
            </div>

            <p className=" mt-3  text-sm">{product.description}</p>

            <div className="mt-3 ">
                <h4 className="font-semibold text-slate-700">Select a Size:</h4>
                <div className="mt-2 flex gap-3 ">
                    {product.sizes.map((size: any, i: any) => (
                        <Link
                            key={i}
                            href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
                        >
                            <div
                                onClick={() => setSize(size.size)}
                                className={`flex items-center justify-center w-11 h-11 rounded-full bg-slate-200 text-slate-700 hover:outline hover:outline-1 hover:outline-slate-400 hover:outline-offset-[3px] transition-all transition  ${
                                    i == router.query.size &&
                                    "font-semibold outline outline-1 outline-slate-400 outline-offset-[3px] bg-gradient-to-r from-amazon-orange to-slate-100"
                                }`}
                            >
                                {size.size}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-2 ">
                <h4 className="font-semibold text-slate-700">
                    Select a Color:
                </h4>
                <div className="mt-2 flex gap-3">
                    {product.colors &&
                        product.colors.map((color: any, i: any) => (
                            <span
                                key={i}
                                className={`rounded-full w-11 h-11 hover:outline outline-1 hover:outline-offset-[3px] hover:outline-slate-400  transition-all transition ${
                                    i == router.query.style
                                        ? "outline outline-1 outline-offset-[3px] outline-slate-400"
                                        : ""
                                }`}
                                onMouseOver={() =>
                                    setActiveImg(
                                        product.subProducts[i].images[0].url
                                    )
                                }
                                onMouseLeave={() => setActiveImg("")}
                            >
                                <Link
                                    href={`/product/${product.slug}/?style=${i}`}
                                >
                                    <Image
                                        className="rounded-full object-cover h-11"
                                        width={44}
                                        height={44}
                                        src={color.image}
                                        alt={color.color}
                                    />
                                </Link>
                            </span>
                        ))}
                </div>
            </div>

            <div className="mt-6  flex items-center space-x-2">
                <button
                    className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300"
                    onClick={() => qty > 1 && setQty((prev) => prev - 1)}
                >
                    <MinusIcon className="w-4 h-4  text-slate-800" />
                </button>
                <span className="text-m text-slate-900">{qty}</span>
                <button
                    className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300"
                    onClick={() =>
                        qty < product.quantity && setQty((prev) => prev + 1)
                    }
                >
                    <PlusIcon className="w-4 h-4  text-slate-900" />
                </button>
            </div>

            <div className="mt-2 flex items-center flex-col md:flex-row md:space-x-3">
                {loading ?(
                        <>
                            <ArrowPathIcon className="w-8 h-8" />
                            <span className="font-semibold text-xl">
                                Loading...
                            </span>
                        </>
                    ) :(

                <button
                    disabled={product.quantity < 1}
                    onClick={() => buyNow()}
                    className="w-40 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-600 font-semibold text-white p-2 rounded space-x-2 hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-500 hover:shadow-md rounded-full p-2 hover:text-lime-200 transition duration-500 ease-in-out max-md:mt-3"
                >   
                    <span>Buy Now</span>
                </button>
                )}
                
                <button
                    className={`w-40 flex items-center justify-center  bg-gradient-to-r from-blue-500 to-cyan-600 font-semibold text-white p-2 rounded  hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-500 hover:shadow-md rounded-full p-2  hover:text-lime-200 transition duration-500 ease-in-out max-md:mt-3 ${
                        product.quantity < 1 ? "cursor-not-allowed" : ""
                    }`}
                    disabled={product.quantity < 1}
                    onClick={() => addToCartHandler()}
                >
                    {loading ? (
                        <>
                            <ArrowPathIcon className="w-8 h-8" />
                            <span className="font-semibold text-xl">
                                Loading...
                            </span>
                        </>
                    ) : (
                        <>
                            
                            <span className="">
                                Add To Cart
                            </span>
                            

                        </>
                    )}
                </button>

                
            </div>
            <div className="m-2">
                {error && (
                    <span className="mt-2 text-red-500 font-semibold">
                        {error}
                    </span>
                )}
            </div>

            <div className="mt-4">
                <AccoridanProduct
                    details={product.details}
                    questions={product.questions}
                />
            </div>
        </div>
    );
};

export default Infos;