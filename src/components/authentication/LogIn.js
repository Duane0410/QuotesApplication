import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'

const LOGIN_URL = '/login'

function Login() {
    const { setAuth } = useContext(AuthContext)

    // const navigate = useNavigate()
    // const location = useLocation()
    // const from = location.state?.from?.pathname || '/'

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')
    // const [validUser, setValidUser] = useState(false)
    // const [validPass, setValidPass] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Username - ', user, '\nPassword - ', pass)

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({ "user": user, "pass": pass }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data))

            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles

            setAuth({ user, pass, roles, accessToken })
            
            setUser('')
            setPass('')
            setSuccess(true)
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response!')
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password!')
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized!')
            } else {
                setErrMsg('Login Failed!')
            }
            errRef.current.focus()
        }
    }

  return (
    <>
        {/* <button
            type='button'
            className='btn btn-primary btn-lg qotd'
            onClick={() => navigate('/')}
        >Home</button> */}

        {success ? (
            <section>
                <h1 className='heading'>You are logged in!</h1>
                <br />
                <p>
                    Go to <a href='/'>Home page</a>
                </p>
            </section>
        ) : (
            <section >
                <p ref={errRef} className={errMsg ? 'text-danger' : 'd-none'} aria-live='assertive'>
                    {errMsg}
                </p>
            
                <h1 className='heading mb-5'>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className='row d-flex mb-3'>
                        <label htmlFor='username' className='text-primary text-start fs-5'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            className='form-control w-100'
                            ref={userRef}
                            autoComplete='off'
                            onChange={e => setUser(e.target.value)}
                            required
                        />
                    </div>

                    <div className='row d-flex mb-3'>
                        <label htmlFor='password' className='text-primary fs-5'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            className='form-control w-100'
                            onChange={e => setPass(e.target.value)}
                            required
                        />
                    </div>

                    <div className='d-flex mb-3'>
                        <button className='btn btn-lg btn-primary mb-3 w-100'>
                            Sign In
                        </button>
                    </div>
                </form>
                <p>
                    Need an Account?<br />
                    <span className='line'>
                        <a href='/register'>Sign Up</a>
                    </span>
                </p>
            </section>
        )}
    </>
  )
}

export default Login