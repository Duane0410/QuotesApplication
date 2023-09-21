import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [userError, setUserError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')

    const navigate = useNavigate()

  
    const submitHandler = (e) => {
        e.preventDefault()

        console.log('Username - ', userName)
        console.log('Email - ', email)
        console.log('Passwoed - ', password)

    }

  return (
    <div className=' d-flex justify-content-center w-100'>
        <button
            type='button'
            className='btn btn-primary btn-lg qotd'
            onClick={() => navigate('/')}
        >Home</button>

        <form className='col-md-4' onSubmit={submitHandler}>

            <div className='d-grid mb-3 text-center'>
                <h1 className='heading'>Register!</h1>
            </div>

            <div className='d-grid'>
                <div className='input-group mb-3 w-100'>
                    <label htmlFor='username' className='input-group-text w-25' id='inputGroup-sizing-default'>Username: </label>
                    <input type='text' className='form-control' id='username' autoComplete='off' onChange={e => setUserName(e.target.value)}/>
                </div>
                <p className={userError ? `text-danger` : 'd-none'}>{userError}</p>
            </div>
            <br />

            <div className='d-grid'>
                <div className='input-group mb-3 w-100'>
                    <label htmlFor='email' className='input-group-text w-25' id='inputGroup-sizing-default'>E-mail: </label>
                    <input type='text' className='form-control' id='email' autoComplete='off' onChange={e => setEmail(e.target.value)}/>
                </div>
                <p className={emailError ? `text-danger` : 'd-none'}>{emailError}</p>
            </div>
            <br />

            <div className='d-grid'>
                <div className='input-group mb-3 w-100'>
                    <label htmlFor='password' className='input-group-text w-25' id='inputGroup-sizing-default'>Password: </label>
                    <input type='password' className='form-control' id='password' autoComplete='off' onChange={e => setPassword(e.target.value)}/>
                </div>
                <p className={passError ? `text-danger` : 'd-none'}>{passError}</p>
            </div>
            <br />
            
            <div className='d-grid'>
                <button type='submit' className='btn btn-primary mb-3'>Register</button>
            </div>

            <p style={{color: 'navy'}} className='text-center'>or <Link to='/log-in'>Log In</Link> with your account</p>

        </form>
    </div>
  )
}

export default SignUp