import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import QuoteOfTheDay from './main/QuoteOfTheDay'
import '../static/home.css'

function SoftwareQuotes() {
    const location = useLocation()
    const currentUrl = location.pathname

    const [show, setShow] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const navigate = useNavigate()

    const clickHandler = (e) => {
        navigate(`/${e.target.value}`)
    }

    useEffect(() => {
        if (currentUrl) {
            
            const linkActive = document.querySelectorAll('.btn');

            const removeActive = () => {
                if (linkActive) {
                    linkActive.forEach((e) => e.classList.remove('active'));
                }
            };
    
            removeActive();
    
            if (currentUrl) {
                const putColor = document.getElementById(currentUrl);
                if (putColor?.classList) putColor.classList.add('active');
            }
        }
    }, [currentUrl])

  return (
    <div>
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

        <nav>
            <div class="heading">
                Software Quotes
            </div>
            <div class="navigationlinks">
                <button 
                    className='btn btn-outline-primary'
                    value='authors' 
                    id='/authors'
                    onClick={clickHandler}
                >Authors
                </button>
                <button 
                    className='btn btn-outline-primary' 
                    value='quotes' 
                    id='/quotes'
                    onClick={clickHandler}
                >Quotes
                </button>
                <Button className='btn btn-primary' onClick={handleShow}>
                    Quote of the Day
                </Button>
            </div>
        </nav>

    </div>
  )
}


export default SoftwareQuotes