import React, { useState,useEffect } from 'react'
import DelivaryDetails from './DelivaryDetails'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../index.js'
import CartItem from './CartItem'

const BuyNow = () => {
  const [products, setProducts] = useState([])

const {userInfo} = useSelector((state)=>state.auth)
const userId =userInfo? userInfo.user._id : ''

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products/cart/${userId}`)
        const products = res.data.data.items
        setProducts(products)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex mt-20 flex-between flex-wrap">
      <div className="md-mx:w-[95%] mx-auto w-[62%]">
        <div className="p-3 m-2 border-[1px] border-gray-300 rounded-lg  flex flex-col gap-3">
          <div className="text-2xl font-semibold">Review Items</div>
          <hr />
          {products.length ?
            products.map((product, index) => {

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
              return <React.Fragment key={index}><CartItem id={product.productId} image={base64Image} name={product.name} price={product.price} quantity={product.quantity} cart={true} /> {index < product.length - 1 && <hr />}</React.Fragment>
            }) : <div className="text-gray-600 text-lg font-semibold h-full flex items-center     justify-center">Your cart is empty</div>
          }


        </div>
        <DelivaryDetails />
      </div>
      {/* <OrderSummary totalPrice={totalPrice} valid={valid} handleRun={handleRun} /> */}
    </div>
  )
}

export default BuyNow