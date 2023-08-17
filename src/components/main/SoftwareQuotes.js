import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import QuoteOfTheDay from './QuoteOfTheDay'

function SoftwareQuotes() {
    const [show, setShow] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const navigate = useNavigate()

    const clickHandler = (e) => {
        navigate(`/${e.target.value}`)
    }

  return (
    <div>
        <Button variant="primary" className='qotd' onClick={handleShow}>
            Quote of the Day
        </Button>

        <QuoteOfTheDay show={show} handleClose={handleClose}/>

        {/* <button 
            type='button'
            className='btn btn-primary qotd'
            style={{top: '170px', width: '100px'}}
            value='log-in'
            onClick={clickHandler}
        >Sign In</button>

        <button 
            type='button'
            className='btn btn-primary qotd'
            style={{top: '110px', width: '100px'}}
            value='register'
            onClick={clickHandler}
        >Sign Up</button> */}

        <h1 className='heading' >Software Quotes</h1>

        <button 
            type='button' 
            className='btn btn-primary btn-lg butn' 
            value='authors' 
            onClick={clickHandler}
        >Authors</button>
        
        <button 
            type='button' 
            className='btn btn-primary btn-lg butn' 
            value='quotes' 
            onClick={clickHandler}
        >Quotes</button>
    </div>
  )
}


export default SoftwareQuotes