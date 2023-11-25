import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GridCategory = ({ category, products, gridCols}: any) => {
    const [loading, setLoading] = useState(false);
    const length = gridCols * gridCols;
    const selectedProducts = products.filter( (product: any) => ( category == product.category.slug)).slice(0, length);
    if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Loading...</h2>
              <div className="animate-spin h-8 w-8  border-t-4 mx-8 rounded-full border-slate-950"></div>
            </div>
          </div>
        );
      }
    return ( 
        <div className="flex flex-col bg-white border rounded p-2">
                <h3 className="font-bold my-2 uppercase">{category.replace("-"," ")}</h3>
                <div className={`h-full grid grid-cols-${gridCols} gap-4 m-1  items-center`}>
                
                {selectedProducts.map((product: any) => (
                        <Link href="/browse" onClick={()=>setLoading(true)} key={product._id}>
                            <div className={`relative  ${length > 1 ? 'h-[200px]' : 'h-[320px]'}`}>
                                <Image
                                    src={product.subProducts[0].images[0].url}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover rounded"
                                />  
                            </div>
                            {length > 1 && (<h4 className="text-xs mt-1">{product.name}</h4>)}
                        </Link>
                    ))}

                

                </div>
                {length > 1 ? (
                    <h4 className="text-xs cursor-pointer hover:underline text-blue-500 my-2">See more</h4>
                ) : (
                    <h4 className="text-xs cursor-pointer hover:underline text-blue-500 my-2">Shop now</h4>
                )}
        </div>
     );
}
 
export default GridCategory;