import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import useGetData from '../../hooks/useGetData'

function QuoteOfTheDay({show, handleClose}) {

    const quotes = useGetData('/quote')
    const [quote, setQuote] = useState({})
    const [oldQuotes, setOldQuotes] = useState([])

    const savedDate = localStorage.getItem('date')
    const savedOld = localStorage.getItem('old-quotes')
    const savedQuote = localStorage.getItem('quote')

    // console.log(savedDate)
    // console.log('Saved old - ', savedOld)
    // console.log('Saved qotd - ', savedQuote)

    useEffect(() => {
        if (savedOld !== null) {
            setOldQuotes(JSON.parse(savedOld))

            // console.log('Old quotes - ', oldQuotes)
        }

        const randomQuote = () => {
            const randomIndex = Math.floor(Math.random() * quotes.length)
            let newQuote = quotes[randomIndex]
            // console.log('Random', newQuote)
            while (oldQuotes.includes(newQuote)) {
            newQuote = randomQuote()
            }
            return newQuote
        }

        const newDate = (date) => {
            const presentDate = new Date().toLocaleDateString()
            return presentDate !== date
        }


        if (savedQuote !== 'undefined' && !newDate(savedDate)) {
            setQuote(JSON.parse(savedQuote))
            // console.log('Saved - ', quote)

            // console.log('Old Quotes - ', oldQuotes)
        } else {
            const randomQ = randomQuote()
            setQuote(randomQ)
            // console.log('New - ', quote)

            setOldQuotes(prevQuotes => {
                const updatedOldQuotes = [...prevQuotes, randomQ]
                if (updatedOldQuotes.length > 10) {
                    updatedOldQuotes.shift()
                }
                return updatedOldQuotes
            })

            localStorage.setItem('old-quotes', JSON.stringify(oldQuotes))

            localStorage.setItem('quote', JSON.stringify(randomQ))
            localStorage.setItem('date', new Date().toLocaleDateString())

            // console.log('Old Quotes - ', oldQuotes)
        }

    }, [savedDate])

    const changeHandler = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length)
        const newQuote = quotes[randomIndex]
        setQuote(newQuote)

        setOldQuotes(prevQuotes => {
            const updatedOldQuotes = [...prevQuotes, newQuote]
            if (updatedOldQuotes.length > 10) {
                updatedOldQuotes.shift()
            }
            return updatedOldQuotes
        })

        // localStorage.clear()

        localStorage.setItem('old-quotes', JSON.stringify(oldQuotes))

        localStorage.setItem('quote', JSON.stringify(newQuote))
        localStorage.setItem('date', new Date().toLocaleDateString())

        // savedQuote = localStorage.getItem('quote')
        // savedDate = localStorage.getItem('date')

        // console.log('Old Quotes - ', oldQuotes)

        // console.log('Saved Date', savedDate)
        // console.log('Saved Quote', savedQuote)
    }

  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4><strong className='text-body-secondary'>Quote Of The Day:</strong></h4>
                </Modal.Title>
            </Modal.Header>
            <ul>
                {
                    quotes.length 
                        ? <Modal.Body className='quotes-lists' key={quote?._id}>
                            {quote?.quote} <br />
                        </Modal.Body>
                        : null
                }
            </ul>
            <Modal.Footer>
                <span className='fst-italic' style={{position: 'relative', right: '100px'}}>
                    By {quote?.author}
                </span>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" className='btn btn-primary' onClick={changeHandler}>
                    Change Quote
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default QuoteOfTheDay