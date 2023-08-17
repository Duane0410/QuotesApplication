import React, { useEffect, useRef, useState } from 'react'
import SoftwareQuotes from './SoftwareQuotes'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetData from '../../hooks/useGetData'

function Quotes() {
  let initialValue = ''

  const searchRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchAuthor = searchParams.get('author')

  // console.log('Data - ', location.state)

  // console.log('Params - ', searchParams)
  // console.log('Search - ', searchAuthor)
  
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
      <SoftwareQuotes />
  
      <form onSubmit={submitHandler} className='input-group mb-3'>
        <span 
          className='input-group-text' 
          id='inputGroup-sizing-default'
        >Search by Author: </span>

        {
          value === '$' ?
          <input 
            type='text' 
            ref={searchRef}
            className='form-control'
            onChange={e => setValue(e.target.value)}
          /> :
          <input 
            type='text' 
            ref={searchRef}
            className='form-control'
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

      <h1 className='text-body-secondary' >Quotes</h1>

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