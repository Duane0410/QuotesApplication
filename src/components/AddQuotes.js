import React, { useEffect, useRef, useState } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useGetData from '../hooks/useGetData'

// function generateUUID() {
//   return 'xxxxxxxx4xxxyxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = (Math.random() * 16) | 0,
//         v = c === 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
//   })
// }

function AddQuotes() {
    const navigate = useNavigate()

    const quoteRef = useRef()

    // const [quotes, setQuotes] = useState([])
    // const quotes = useGetQuotes()
    const quotes = useGetData('https://quotes-vfas.onrender.com/quote')
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [newQuotes, setNewQuotes] = useState(quotes)
    console.log('New Quote - ', newQuotes)

    useEffect(() => {
        quoteRef.current.focus()
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        console.log('All Quotes - ', quotes)

        console.log('Quote - ',quote)
        console.log('Author - ',author)

        setNewQuotes([...newQuotes, {
            likes: 0,
            dislikes: 0,
            isActive: true,
            // _id: generateUUID(),
            _id: '',
            author: author,
            quote: quote,
            __v: 0
        }])
        console.log('New Quote - ', newQuotes)

        // setNewQuotes([...newQuotes, quotes])

        console.log('Quotes being sent - ', newQuotes)
        navigate('/quotes', { state: newQuotes })

        setQuote('')
        setAuthor('')

        alert(`Check back later if your quote "${quote}" was added!`)
    }

  return (
    <div>
        <button
            type='button'
            className='btn btn-primary btn-lg qotd'
            onClick={() => navigate('/')}
        >
        Home</button>
        <section>
            <h1 className='heading mb-5'>Add Quotes</h1>
            <form onSubmit={submitHandler}>
                <div className='row d-flex mb-3'>
                    <label htmlFor='quote' className='text-primary text-start fs-5'>
                        Quote:
                    </label>
                    <textarea
                        type='text'
                        className='form-control w-100'
                        ref={quoteRef}
                        onChange={(e) => setQuote(e.target.value)}
                        required
                    />
                </div>
                
                <div className='row d-flex mb-3'>
                    <label htmlFor='author' className='text-primary text-start fs-5'>
                        Author:
                    </label>
                    <input
                        type='text'
                        className='form-control w-100'
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <div className='d-flex mb-3'>
                    <button className='btn btn-lg btn-primary mb-3 w-100'>
                        Add Quote
                    </button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default AddQuotes