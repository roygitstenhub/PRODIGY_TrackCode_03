import React from 'react'
import Brands from './Brands'

const TopBrands = () => {
  const brands = ["Staples", "Sprouts", "Grocery outlet", "Mobile stones", "Sports Basement", "Container Store", "Target", "Bevmo!"]
  return <div className="p-5 w-full">
    <div className="text-xl md:text-2xl lg:text-3xl  mb-5 font-semibold">Top Brands</div>
    <div className="flex flex-wrap gap-2 justify-evenly">
      {
        brands.map((x, i) => <Brands key={i} name={x} />)
      }
    </div>
  </div>
}

export default TopBrands