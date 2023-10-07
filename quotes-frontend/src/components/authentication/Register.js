import React, { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
// const REGISTER_URL = '/api/registers'

const Register = () => {
    const navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pass, setPass] = useState('')
    const [validPass, setValidPass] = useState(false)
    const [passFocus, setPassFocus] = useState(false)

    const [matchPass, setMatchPass] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log('Results user - ', result)
        console.log('Username - ', user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PASS_REGEX.test(pass)
        console.log('Results pass - ', result)
        console.log('Password - ', pass)
        setValidPass(result)
        const match = pass === matchPass
        setValidMatch(match)
    }, [pass, matchPass])

    useEffect(() => {
        setErrMsg('')
    }, [user, pass, matchPass])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const v1 = USER_REGEX.test(user)
        const v2 = PASS_REGEX.test(pass)
        if(!v1 || !v2) {
            setErrMsg('Invalid Entry')
            return
        }


        console.log('Username - ', user)
        console.log('Password - ', pass)
        // setSuccess(true)

        try {
            // const response = await axios.post(REGISTER_URL, 
            const response = await axios.post('http://localhost:3001/api/register-requests',
                JSON.stringify({ Username: user, Password: pass }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response.data)
            console.log(response.accessToken)
            console.log(JSON.stringify(response))

            setSuccess(true)
        } catch (error) {
            console.log('Error response - ', error)
            if (!error?.response) {
                setErrMsg('No Server Response!')
            } else if (error.response?.status === 409) {
                setErrMsg('Username Already Exists!')
            } else {
                setErrMsg('Registration Failed!')
            }
            errRef.current.focus()
        }
    }

  return (
    <>
        <button
            type='button'
            className='btn btn-primary btn-lg qotd'
            onClick={() => navigate('/')}
        >Home</button>

        {
            success ?
            (
                <section>
                    <h1 className='heading'>Success!</h1>
                    <p>
                        <a href='/log-in'>Sign In</a>
                    </p>
                </section>
            ) :
            (
                // <section style={{textAlign: 'center', width: '50%'}}>
                <section>
                    <p ref={errRef} className={errMsg ? 'text-danger' : 'd-none'} aria-live='assertive'>{errMsg}</p>
                
                    <h1 className='heading mb-5'>Register</h1>

                    <form onSubmit={handleSubmit}>
                        <div className='row d-flex mb-3'>
                            <label htmlFor='username' className='text-primary text-start fs-5'>
                                Username:
                                <span className={validName ? 'valid text-success' : 'd-none'}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !user ? 'd-none' : 'invalid text-danger'}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type='text'
                                id='username'
                                className='form-control w-100'
                                ref={userRef}
                                autoComplete='off'
                                onChange={e => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby='uidnote'
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id='uidnote' className={userFocus && user && !validName ? 'instructions text-danger' : 'd-none'}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>

                        <div className='row d-flex mb-3'>
                            <label htmlFor='password' className='text-primary fs-5'>
                                Password:
                                <span className={validPass ? 'valid text-success' : 'd-none'}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPass || !pass ? 'd-none' : 'invalid text-danger'}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type='password'
                                id='password'
                                className='form-control w-100'
                                onChange={e => setPass(e.target.value)}
                                required
                                aria-invalid={validPass ? 'false' : 'true'}
                                aria-describedby='passnote'
                                onFocus={() => setPassFocus(true)}
                                onBlur={() => setPassFocus(false)}
                            />
                            <p id='passnote' className={passFocus && !validPass ? 'instructions text-danger' : 'd-none'}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters:
                                <span aria-label='exclamation mark'>!</span>
                                <span aria-label='at symbol'>@</span>
                                <span aria-label='hashtag'>#</span>
                                <span aria-label='dollar sign'>$</span>
                                <span aria-label='percent'>%</span>
                            </p>
                        </div>

                        <div className='row d-flex mb-3'>
                            <label htmlFor='confirm_password' className='text-primary fs-5'>
                                Confirm Password:
                                <span className={validMatch && matchPass ? 'valid text-success' : 'd-none'}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPass ? 'd-none' : 'invalid text-danger'}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type='password'
                                id='confirm_password'
                                className='form-control w-100'
                                onChange={e => setMatchPass(e.target.value)}
                                required
                                aria-invalid={validMatch ? 'false' : 'true'}
                                aria-describedby='confirmnote'
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions text-danger' : 'd-none'}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                        </div>

                        <div className='d-flex mb-3'>
                            <button disabled={!validName || !validPass || !validMatch ? true : false} className='btn btn-lg btn-primary mb-3 w-100'>
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className='line'>
                            <a href='/log-in'>Log In</a>
                        </span>
                    </p>
                </section>
            )
        }
    </>
  )
}

export default Register