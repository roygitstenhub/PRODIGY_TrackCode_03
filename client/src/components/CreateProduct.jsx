import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios"
import { baseUrl } from "../index.js"

const CreateProduct = () => {
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState(0)
    const [bgcolor, setBgcolor] = useState('white')
    const [panelcolor, setPanelcolor] = useState('white')
    const [textcolor, setTextcolor] = useState('black')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${baseUrl}/api/products/`, {
                image,
                name,
                price,
                discount,
                bgcolor,
                panelcolor,
                textcolor,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setImage(null)
            setName('')
            setPrice('')
            setDiscount('')
            setBgcolor('')
            setPanelcolor('')
            setTextcolor('')
            console.log(res)

        } catch (error) {
            console.log(error)
        }
        window.location.reload(false)
    }
    return (
        <div className=' w-full flex items-center justify-center '>
            <Form className=' p-2 md:w-2/3 ' onSubmit={handleSubmit} encType="multipart/form-data" >
                <h2 className='text-xl font-bold mb-4' >Create New Product</h2>
                <h3 className='text-lg font-semibold mb-2'>Product Details</h3>
                <Form.Group className="mb-6" controlId="formGridAddress2">
                    <Form.Label className='text-md font-semibold mb-4'>Product Image</Form.Label>
                    <Form.Control type="file" name='image' onChange={(e) => setImage(e.target.files[0])} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control type="text" value={name} placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control type="text" value={price} placeholder="Enter Product price" onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control type="text" value={discount} placeholder="Enter Discount price" onChange={(e) => setDiscount(e.target.value)} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <h3 className='text-lg font-semibold mb-2'>Pannel Details</h3>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control type="" value={bgcolor} placeholder="Background Color" onChange={(e) => setBgcolor(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control type="" value={panelcolor} placeholder="Panel Color" onChange={(e) => setPanelcolor(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control type="" value={textcolor} placeholder="Text Color" onChange={(e) => setTextcolor(e.target.value)} />
                    </Form.Group>
                </Row>


                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>

        </div>
    )
}

export default CreateProduct