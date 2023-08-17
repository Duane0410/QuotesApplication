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

  const validate = () => {

    setUserError('')
    setEmailError('')
    setPassError('')

    if (userName.length < 8) {
      setUserError('*Invalid Username!')
      return false
    }

    setUserError('')

    if (!email.includes('@')) {
      setEmailError('*Invalid E-mail!')
      return false
    }

    if (password.length < 8) {
      setPassError('*Invalid Password!')
      return false
    }

    setPassError('')

    return true
  }
  
  const submitHandler = (e) => {
    e.preventDefault()

    console.log('Username - ', userName)
    console.log('Email - ', email)
    console.log('Passwoed - ', password)

    if (validate()) {
      alert('Sign-up successful!')
    }
  }

  return (
    <div>
      <button
        type='button'
        className='btn btn-primary btn-lg qotd'
        onClick={() => navigate('/')}
      >Home</button>

      <div className='mb-5'>
        <h1 className='heading'>Register!</h1>
        <p style={{color: 'navy'}}>or <Link to='/log-in'>Log In</Link> with your account</p>
      </div>

      <form className='col gy-1 gx-1' onSubmit={submitHandler}>
        <div className='col-auto'>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='inputGroup-sizing-default'>Username: </span>
            <input type='text' className='form-control' onChange={e => setUserName(e.target.value)}/>
          </div>
          <p className='text-danger'>{userError}</p>
        </div>
        <br />

        <div className='col-auto'>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='inputGroup-sizing-default'>E-mail: </span>
            <input type='text' className='form-control' onChange={e => setEmail(e.target.value)}/>
          </div>
          <p className='text-danger'>{emailError}</p>
        </div>
        <br />

        <div className='col-auto'>
        <div className='input-group mb-3'>
            <span className='input-group-text' id='inputGroup-sizing-default'>Password: </span>
            <input type='password' className='form-control' onChange={e => setPassword(e.target.value)}/>
          </div>
          <p className='text-danger'>{passError}</p>
        </div>
        <br />
        
        <div className='row-auto'>
          <button type='submit' className='btn btn-primary mb-3'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp