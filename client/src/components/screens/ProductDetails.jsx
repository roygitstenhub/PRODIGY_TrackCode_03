import React from 'react'
import { CheckIcon, HeartIcon, MinusIcon, PlusIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from '../../index.js';
import { useSelector } from 'react-redux';


const ProductDetails = () => {
  const [heart, setHeart] = useState(false);
  const [product, setProduct] = useState({});
  const [added, setAdded] = useState(false);
  const [goToCart, setGoToCart] = useState(false);
  const [count, setCount] = useState(1)

  const { userInfo } = useSelector((state) => state.auth)

  const { id } = useParams()

  const navigate=useNavigate()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products/${id}`)
        setProduct(res.data)
      } catch (error) {
        console.log("Msg:", error.message)
      }
    }
    fetchData()
  }, [])

  //discount calculation 
  const discountPrice = product.discount ? (product.price - product.discount)
    : product.price

  //Image conversion
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

  function handleByNow() {
    if (!userInfo) {
      navigate("/login")
    } else {
      navigate("/buy")
    }
  }


  function handleLike() {

  }

  function handleAdd() {

  }

  return (
    <div className="my-5 md-mx:mx-2 mx-10 mt-20 flex flex-col gap-12 items-center justify-center sm-mx: ">
      <div className="relative w-fit h-fit bg-gray-100 rounded-xl flex items-center justify-center">
        <img className=" md:w-[300px] " src={base64Image} alt="img" />
        <div onClick={handleLike} className=" cursor-pointer absolute md-mx:right-3 md-mx:top-3 md:right-5 md:top-5  transition duration-300 ease-in-out bg-white p-2 rounded-full hover:bg-red-100">
          {
            !heart && <HeartIcon className="h-5 w-5" />}
          {heart && <HeartIconSolid className="h-5 w-5 text-red-500" />}
        </div>
      </div>
      <div className="flex max-w-[272px] flex-col gap-2">
        <span className="text-2xl font-bold">{product.name}</span>
        <div className="flex flex-col">
          <span className="text-lg font-bold">₹ {discountPrice}</span>
          <span className=" text-xs text-gray-600 font-semibold">Suggested payment with 6 months special EMI</span>
        </div>
        <hr />
        <div className="flex gap-4 items-center">
          <div className="flex gap-4 rounded-xl text-sm font-semibold items-center px-3 py-1.5 bg-gray-100 w-fit"> <MinusIcon className="w-4 h-4 font-extrabold cursor-pointer text-red-500" onClick={() => setCount(Math.max(count - 1, 1))} /> <span>{count}</span> <PlusIcon className="cursor-pointer w-4 h-4 text-green-600" onClick={() => setCount(Math.min(count + 1, 10))} /> </div>
          <span className="text-xs  text-gray-600 font-semibold"> Only <span className="text-orange-500">12 Items</span> Left!</span>
        </div>
        <hr />
        <div className="flex gap-4">
          <button className="border focus:outline-none  font-semibold border-blue-500 text-white bg-blue-500 text-sm hover:bg-blue-800  py-2 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px] " onClick={handleByNow} >Buy Now</button>

          {!added && !goToCart && <button onClick={() => { handleAdd() }} className="border focus:outline-none  font-semibold border-blue-500 text-blue-500 text-sm hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px]  " >Add to Cart</button>}
          {
            added && <button className=" flex border border-green-500  text-sm focus:outline-none   bg-green-500 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px] " ><CheckIcon className="font-extrabold w-5 h-5" /> Added</button>
          }
          {
            goToCart && <Link to={`/cart`}><button className="border focus:outline-none  font-semibold border-blue-500 text-white bg-blue-500 text-sm hover:bg-blue-800  py-2 px-4 rounded-full transition duration-300 ease-in-out xsm-mx:text-[10px]/[12px] " >Go to Cart</button></Link>
          }
        </div>
      </div>

    </div>
  )
}

export default ProductDetails