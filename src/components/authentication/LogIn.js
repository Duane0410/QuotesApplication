import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'

const LOGIN_URL = '/api/registers'

function Login() {
    // const { loading, error, data } = useFetch(`http://localhost:1337` + LOGIN_URL)
    // if(!loading) {
    //     console.log('Data - ', data)
    //     console.log('Error - ', error)
    // }

    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

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
        console.log(user, pass)

        const requestBody = {
            data: {
                Username: user,
                Password: pass
            }
        };
    
        try {
            const response = await fetch('http://localhost:3001/api/registers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (response.status === 200) {
                const result = await response.json();
                console.log('Result - ', result);
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    token: result.token
                }));
                setSuccess(true);
            } else {
                throw new Error('Login Failed');
            }
        } catch (error) {
            console.error(error);
            setErrMsg('Login Failed');
        }

        // fetch('http://localhost:3001/api/registers', {
        //     method: 'POST',
        //     data: JSON.stringify(
        //         {
        //             Username: user,
        //             Password: pass
        //         }
        //     )
        // }).then((response) => {
        //     response.json().then((result) => {
        //         console.log('Result - ', result)
        //         localStorage.setItem('login', JSON.stringify({
        //             login: true,
        //             token: result.token
        //         }))
        //     })
        // }).catch((err) => {
        //     console.log(err)
        // });

        // if(!loading) {
        //     data.forEach(element => {
        //         console.log('DataE', ' - ', element.attributes.Username)

        //         if (element.attributes.Username === user) {
        //             setValidUser(true)
        //         }
                
        //         if (element.attributes.Password === pass) {
        //             setValidPass(true)
        //         }
        //     })
        // }

        // if (validUser && validPass) {
        //     setSuccess(true)
        //     // navigate(from, { replace: true })
        // } else if (validUser || validPass) {
        //     setErrMsg('Username or Password is incorrect!')
        // } else {
        //     setErrMsg('Login Failed!')
        // }
        // errRef.current.focus()
        
        
        // try {
        //     const response = await axios.post(LOGIN_URL, 
        //         JSON.stringify({Username: user, Password: pass}), 
        //         {
        //             headers: { 'Content-Type': 'application/json'},
        //             withCredentials: true
        //         }
        //     )
            
        //     console.log(JSON.stringify(response?.data))

        //     const accessToken = response?.data?.accessToken
        //     const roles = response?.data?.roles

        //     setAuth({ user, pass, roles, accessToken })
        //     setUser('')
        //     setPass('')
        //     setSuccess(true)
        //     navigate(from, { replace: true })
        // } catch (error) {
        //     console.log('Error response - ', error)
        //     if (!error?.response) {
        //         setErrMsg('No Server Response!')
        //     } else if (error.response?.status === 400) {
        //         setErrMsg('Missing Username or Password!')
        //     } else if (error.response?.status === 401) {
        //         setErrMsg('Unauthorized!')
        //     } else {
        //         setErrMsg('Login Failed!')
        //     }
        //     // errRef.current.focus()
        // }
    }

  return (
    <>
        <button
            type='button'
            className='btn btn-primary btn-lg qotd'
            onClick={() => navigate('/')}
        >Home</button>

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
                            value={user}
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
                            value={pass}
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