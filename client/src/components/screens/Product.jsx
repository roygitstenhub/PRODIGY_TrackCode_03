import { useState } from "react";
import { Link } from 'react-router-dom';
import { CheckIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import axios from "axios";
import { baseUrl } from "../../index.js";
import { toast } from "react-toastify"
import { useSelector } from "react-redux";


const Product = ({ image, id, name, price, discount }) => {
    const [added, setAdded] = useState(false);
    const [goToCart, setGoToCart] = useState(false);
    const [heart, setHeart] = useState(false);

    const { userInfo } = useSelector((state) => state.auth)

    const addItemToCart = async () => {
        if (!userInfo || !userInfo.user._id) {
            toast.error("User not logged in");
            return;
        }
        try {
            const res = await axios.post(`${baseUrl}/api/products/cart/add/`, {
                userId: userInfo.user._id,
                productId: id,
                quantity: 1
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const handleLike=()=>{
        setHeart(!heart)
    }

    const handleAdd = () => {
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            setGoToCart(true);
        }, 1000);
    }



    return (
        <>
            <div className=" flex flex-col xsm-mx:w-[20%] xsm-mx:min-w-32 xs-mx:w-[20%] sm-mx:w-[25%] sm-mx:min-w-40 md-mx:w-[30%] md-mx:min-w-52 md:min-w-72 md:w-[23%] gap-1.5">
                <div className="bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <Link to={`/product/${id}`}>
                        <img className="cursor-pointer hover:scale-[1.2] transform transition-transform duration-[400ms]" src={image} alt="image" /></Link>
                    <div onClick={() => handleLike()} className=" cursor-pointer absolute md-mx:right-3 md-mx:top-3 md:right-5 md:top-5  transition duration-300 ease-in-out bg-white p-2 rounded-full hover:bg-red-100">
                        {
                            !heart && <HeartIcon className="h-5 w-5" />}
                        {heart && <HeartIconSolid className="h-5 w-5 text-red-500" />}
                    </div>
                </div>
                <Link to={`/product/${id}`} className=" ">
                    <div className="flex justify-between xsm-mx:text-xs  sm-mx:text-sm md-mx:text-green-500 md:text-lg font-semibold text-gray-700">
                        <span >{name}</span>
                        <span >₹ {price}</span>
                    </div></Link>
                <span className="xsm-mx:text-[8px]/[10px] text-xs text-gray-500 font-semibold"><span className="text-blue-500">Discount: </span>{discount}</span>
                <div className="flex" >{
                    [...Array(5)].map((e, i) => {
                        if (i < 8) return <StarIconSolid key={i} className=" xsm-mx:h-3  xsm-mx:w-3 h-4 text-green-500 w-4" />
                        else return <StarIcon key={i} className=" xsm-mx:h-3  xsm-mx:w-3 h-4 text-green-500 w-4" />
                    })
                }
                    <span className="xsm-mx:text-[8px]/[10px] text-xs text-gray-500 font-semibold">(121)</span>

                </div>
                <div className="flex justify-between mt-2">
                    {!added && !goToCart && <button onClick={() => { addItemToCart(), handleAdd() }} className="border border-blue-500 text-blue-500 text-sm focus:outline-none hover:bg-blue-500 hover:text-white py-1.5 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px] md-mx:text-xs md-mx:py-1 md-mx:px-2" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" class="h-6 w-6 text-sky-600"><path fill="currentColor" fill-rule="evenodd" d="M3.018 3.068L3.395 4.5L4.58 9.005a3 3 0 0 0 4.186 1.948l4.518-2.14A3 3 0 0 0 15 6.102V5a2 2 0 0 0-2-2H4.556l-.15-.535A2 2 0 0 0 2.48 1H.75a.75.75 0 0 0 0 1.5h1.73a.5.5 0 0 1 .482.366zm5.106 6.53l4.518-2.14a1.5 1.5 0 0 0 .858-1.356V5a.5.5 0 0 0-.5-.5H4.946L6.03 8.624a1.5 1.5 0 0 0 2.093.973ZM12 14.75a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5M4.75 13a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0" clip-rule="evenodd"></path></svg>

                    </button>}
                    {
                        added && <button className=" flex border items-center border-green-500 text-green-500 text-sm focus:outline-none hover:bg-green-500 hover:text-white py-1.5 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px] md-mx:text-xs md-mx:py-1 md-mx:px-2" ><CheckIcon className="font-extrabold sm-mx:w-4 sm-mx:h-4 w-5 h-5" /> Added</button>
                    }
                    {
                        goToCart && <Link to={`/cart/${userInfo.user._id}`}><button className="border border-blue-500  text-sm focus:outline-none bg-blue-500 text-white py-1.5 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px] md-mx:text-xs md-mx:py-1 md-mx:px-2" >Go to Cart</button></Link>
                    }
                </div>
            </div>
        </>

    )
}

export default Product