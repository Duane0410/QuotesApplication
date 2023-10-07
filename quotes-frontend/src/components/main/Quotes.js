import React, { useEffect, useRef, useState } from 'react'
import SoftwareQuotes from '../SoftwareQuotes'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'

function Quotes() {
    let initialValue = ''

    const searchRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchAuthor = searchParams.get('author')
    
    searchAuthor ? initialValue = searchAuthor : initialValue = '$'
    
    const [value, setValue] = useState(initialValue)
    let quotes = useGetData(`/quote/search?author=${value}`)

    useEffect(() => {
        searchRef.current.focus()
    }, [])

    useEffect(() => {
        location.search = ''
    }, [value])

    const submitHandler = (e) => {
        e.preventDefault()
        e.target.value ? setValue(e.target.value) : setValue('$')
        if (location.search === '') {
            navigate('/quotes')
        }
    }

  return (
    <div>
        {/* <SoftwareQuotes /> */}
    
        <form onSubmit={submitHandler} className='input-group mb-3'>
            <label 
                htmlFor='search'
                className='input-group-text' 
                id='inputGroup-sizing-default'
            >Search by Author: </label>

            {
                value === '$'
                ?<input 
                    type='text' 
                    ref={searchRef}
                    className='form-control'
                    id='search'
                    autoComplete='off'
                    onChange={e => setValue(e.target.value)}
                />
                :<input 
                    type='text' 
                    ref={searchRef}
                    className='form-control'
                    id='search'
                    autoComplete='off'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            }

            <button 
                className='btn btn-outline-primary w-25' 
                type='submit'
                id='button-addon2'
            >Search</button>
        </form>

        <h1 className='text-body-secondary'>Quotes</h1>

        <div>
            {
            quotes.map(quote => (
                <div className='quotes-lists' key={quote._id}>
                    {quote.quote} <br />
                    <em>-{quote.author}</em>
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default Quotes