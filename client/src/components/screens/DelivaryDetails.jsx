import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';



const DelivaryDetails = () => {
  const [data, setData] = useState('')


  return (
    <div className="p-5 m-2 border-[1px] border-gray-300 text-sm rounded-lg  flex flex-col gap-4">
      <div className="text-2xl font-semibold">Delivery Information</div>
      <div className="flex gap-2 flex-col">
        {/* <FloatingInput id="firstName" name="First Name" value={data.firstName} handleChange={handleChange} errorMessage={formError.firstName} />
        <FloatingInput id="lastName" name="Last Name" value={data.lastName} handleChange={handleChange} errorMessage={formError.lastName} /> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Roysten" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Gonsalxxxx" />
        </Form.Group>
      </div>
      <div >
        {/* <FloatingInput id="address" name="Address" value={data.address} handleChange={handleChange} errorMessage={formError.address} /> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter adress" />
        </Form.Group>
      </div>
      <div className="flex gap-2 ">
        {/* <FloatingInput id="city" name="City / Town" value={data.city} handleChange={handleChange} errorMessage={formError.city} />
        <FloatingInput id="zipCode" name="ZipCode" value={data.zipCode} handleChange={handleChange} errorMessage={formError.zipCode} /> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Ex:Honnavar" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Zip code</Form.Label>
          <Form.Control type="text" placeholder="123XX" />
        </Form.Group>
      </div>
      <div className="flex gap-2 ">
        {/* <FloatingInput id="mobileNumber" name="Mobile Number" value={data.mobileNumber} handleChange={handleChange} errorMessage={formError.mobileNumber} />
        <FloatingInput id="email" name="Email Address" value={data.email} handleChange={handleChange} errorMessage={formError.email} /> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" placeholder="8296XXXXXX" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
      </div>
    </div>
  )
}

export default DelivaryDetails