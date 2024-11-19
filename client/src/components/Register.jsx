import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from "../slice/auth/userApiSlice.js"
import { setCredentials } from '../slice/auth/authslice.js';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(()=>{
        if(userInfo) navigate('/')
    },[userInfo,navigate])

    const [register,{isLoading}] = useRegisterMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await register({username,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/login') 
        } catch (error) {
            console.error(error.message)
        }
    }



    return (
        <div className='flex items-center justify-center' >

            <Form className=' md:w-2/5 p-4 ' onSubmit={handleSubmit} >
                <h1 className='font-semibold  text-[1.5rem] mb-4 ' >Register</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} placeholder="Enter Username" onChange={(e) => { setUsername(e.target.value) }} />
                </Form.Group>
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default Register