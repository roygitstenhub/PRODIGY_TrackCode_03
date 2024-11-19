import { useEffect, useState } from "react";
import axios from 'axios'
import { baseUrl } from '../../index.js'
import Product from "./Product.jsx";
import Loading from "./Loading.jsx";


const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(12)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/products/all/products`)
                setLoading(false)
                setProducts(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchdata()
    }, [])

    const handleMore = () => {
        setVisible((prev) => prev + 12)
    }

    return (

        <>
            {
                loading ? <div className="w-full h-screen"><Loading /></div> : (
                    <>
                        <div id="deals" className="scroll-smooth p-5 px-3 w-full">
                            <div className=" text-xl md:text-2xl lg:text-3xl mb-5 font-semibold">All Products</div>
                            <div className="flex  gap-4 pb-10 flex-wrap sm-mx:justify-between">
                                {
                                    Array.isArray(products) && products.slice(0, visible).map((product) => {

                                        let base64Image = '';
                                        if (product.image && product.image.data) {
                                            const uint8Array = new Uint8Array(product.image.data);
                                            let binaryString = '';
                                            for (let i = 0; i < uint8Array.length; i++) {
                                                binaryString += String.fromCharCode(uint8Array[i]);
                                            }
                                            base64Image = `data:image/jpg;base64,${btoa(binaryString)}`;
                                        } else {
                                            base64Image = ' ';
                                        }

                                        return (
                                            <>
                                                <Product key={product._id} id={product._id} image={base64Image} name={product.name} price={product.price} discount={product.discount} />
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex items-center justify-center">
                                {
                                    products.length > 12 && <button onClick={() => { handleMore() }} className=" border border-blue-500 text-blue-500 text-sm focus:outline-none hover:bg-blue-500 hover:text-white py-1.5 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px] md-mx:text-xs md-mx:py-1 md-mx:px-2 " >View More</button>
                                }
                            </div>

                        </div >

                    </>
                )

            }


        </>
    )
}

export default ProductList