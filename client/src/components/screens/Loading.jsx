import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className=' w-full h-screen  flex items-center justify-center flex-col '>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}

export default Loading