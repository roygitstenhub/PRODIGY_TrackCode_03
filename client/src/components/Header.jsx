import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLogoutMutation } from "../../src/slice/auth/userApiSlice.js"
import { logout } from '../slice/auth/authslice.js';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { baseUrl } from '../index.js';




const Header = () => {
    const [query,setQuery] = useState('')

    const [logoutapi] = useLogoutMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const handleSearch=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.get(`${baseUrl}/api/products/search/${query}`)
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLogout = async () => {
        try {
            await logoutapi().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            {['false'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary">
                    <Container fluid className='flex '>
                        <Navbar.Brand href="/" className=' font-bold flex gap-1 items-center justify-center ' >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" className="h-6 w-6 text-sky-600"><path fill="currentColor" fill-rule="evenodd" d="M3.018 3.068L3.395 4.5L4.58 9.005a3 3 0 0 0 4.186 1.948l4.518-2.14A3 3 0 0 0 15 6.102V5a2 2 0 0 0-2-2H4.556l-.15-.535A2 2 0 0 0 2.48 1H.75a.75.75 0 0 0 0 1.5h1.73a.5.5 0 0 1 .482.366zm5.106 6.53l4.518-2.14a1.5 1.5 0 0 0 .858-1.356V5a.5.5 0 0 0-.5-.5H4.946L6.03 8.624a1.5 1.5 0 0 0 2.093.973ZM12 14.75a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5M4.75 13a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0" clip-rule="evenodd"></path></svg>
                            EBuy
                        </Navbar.Brand>

                        <Form className="d-flex" onSubmit={handleSearch}  >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 "
                                aria-label="Search"
                                name="query"
                                value={query}
                                onChange={(e)=>setQuery(e.target.value)}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='' />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='font-bold flex gap-1 items-center justify-center  ' id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" className="h-6 w-6 text-sky-600"><path fill="currentColor" fill-rule="evenodd" d="M3.018 3.068L3.395 4.5L4.58 9.005a3 3 0 0 0 4.186 1.948l4.518-2.14A3 3 0 0 0 15 6.102V5a2 2 0 0 0-2-2H4.556l-.15-.535A2 2 0 0 0 2.48 1H.75a.75.75 0 0 0 0 1.5h1.73a.5.5 0 0 1 .482.366zm5.106 6.53l4.518-2.14a1.5 1.5 0 0 0 .858-1.356V5a.5.5 0 0 0-.5-.5H4.946L6.03 8.624a1.5 1.5 0 0 0 2.093.973ZM12 14.75a1.75 1.75 0 1 0 0-3.5a1.75 1.75 0 0 0 0 3.5M4.75 13a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0" clip-rule="evenodd"></path></svg>
                                    EBuy
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body className='flex flex-col justify-between'>
                                <Nav className=" flex items-baseline flex-col justify-center ">
                                    <Nav.Link href="/" className=' w-full mb-2 p-2 rounded-lg hover:bg-blue-100 '>Home</Nav.Link>
                                    <Nav.Link href="/all/products" className='w-full  mb-2  p-2 rounded-lg hover:bg-blue-100 '>All Products</Nav.Link>
                                    <Link to={`/cart/${userInfo && userInfo.user._id}`} className=' w-full mb-2  p-2 rounded-lg flex gap-2 text-black hover:bg-blue-100 '>
                                        Cart
                                    </Link>
                                    <Nav.Link href="/create/product" className=' w-full mb-2  p-2 rounded-lg hover:bg-blue-100 '>Create New Product</Nav.Link>
                                </Nav>

                                <div className=' flex gap-3 '>
                                    <Nav.Link href="/login" className='w-full mb-2  p-2 rounded-lg bg-blue-600 text-center border '>Login</Nav.Link>
                                    <Nav.Link href="/logout" className='w-full mb-2  p-2 rounded-lg  border border-blue-600 text-center' onClick={handleLogout} >Logout</Nav.Link >
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Header