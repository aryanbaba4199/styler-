import Image from "next/image";
import Link from "next/link";

const Product = ({ product }: any) => {
    return (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-6 border-b p-2 pb-4">
            <div className="md:col-span-1 md:flex md:items-center">
                <img
                    src={product.image}
                    width={200}
                    height={200}
                    className="mx-auto md:mx-0 object-contained rounded-md outline outline-1 outline-offset-2 outline-slate-300"
                    alt={product.name}
                />
            </div>
            <div className="col-span-1 md:col-span-5 ml-0 md:ml-4">
                <Link href="" target="_blank" className="text-sm font-semibold">
                    {product.name}
                </Link>
                <div className="my-2 w-fit flex items-center space-x-3 px-3 py-2 bg-slate-100 rounded-full">
                    <div className="relative w-10 h-10">
                        <img
                            src={product.color.image}
                            className="object-contained rounded-full outline outline-1 outline-offset-2 outline-slate-400"
                            alt={product.color[0]}
                        />
                    </div>
                    <span>{product.size}</span>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex items-center md:mr-2">
                        <span className="font-semibold">Price:</span>
                        <span className="ml-1">{product.price}/-</span>
                    </div>
                    <div className="flex items-center mt-1 md:mt-0">
                        <span className="ml-2 font-semibold">Qty:</span>
                        <span className="ml-1">{product.qty}</span>
                    </div>
                </div>
                <div className="flex justify-end md:flex-row mt-1 md:mt-0">
                    <span className="font-bold">{(product.price * product.qty)} /-</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
