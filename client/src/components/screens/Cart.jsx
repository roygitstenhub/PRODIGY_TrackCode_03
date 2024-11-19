import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CartItem from './CartItem'
import PriceDetails from './PriceDetails.jsx'
import axios from 'axios'
import { baseUrl } from '../../index.js'



const Cart = () => {
  const [products, setProducts] = useState([])
  const [totalPrice,setTotalPrice] = useState(null)

  const { userId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products/cart/${userId}`)
        const products = res.data.data.items
        setProducts(products)
        let totalPrices = products.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(totalPrices)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  return (
    <div className="flex p-3 justify-between md-mx:flex-wrap">
      <div className="md-mx:w-[95%] mx-auto w-[62%] p-3 m-2 border-[1px] border-gray-300 rounded-lg  flex flex-col gap-3">
        <div className="text-2xl xs-mx:text-xl font-semibold">Cart Items</div>
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

            return <React.Fragment key={index}><CartItem  id={product.productId} image={base64Image} name={product.name} price={product.price} quantity={product.quantity} cart={true} /> {index < product.length - 1 && <hr />}</React.Fragment>
          }) : <div className="text-gray-600 text-lg font-semibold h-full flex items-center justify-center">Your cart is empty</div>
        }

      </div>
      <div className="md-mx:w-[95%] mx-auto w-[35%] h-fit py-3 px-5 m-2 border-[1px] border-gray-300 rounded-lg">
        <PriceDetails totalPrice={totalPrice} qty={products.length} />
      </div>
    </div>
  )
}

export default Cart