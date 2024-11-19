import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../slice/auth/userApiSlice.js"
import { setCredentials } from '../slice/auth/authslice.js';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(()=>{
        if(userInfo) navigate('/')
    },[userInfo,navigate])

    const [login,{isLoading}] = useLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({email,password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/') 
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className=' flex items-center justify-center ' >

            <Form className=' rounded-lg p-4 md:w-2/5 ' onSubmit={handleSubmit} >
                <h1 className='font-semibold text-[1.5rem] mb-4 ' >Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    Do you have an account ? <Link to={'/register'}>Register</Link>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


        </div>
    )
}

export default Login