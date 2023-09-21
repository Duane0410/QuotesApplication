import React from 'react'
import { Link } from 'react-router-dom'
import SoftwareQuotes from './SoftwareQuotes'
import useGetData from '../../hooks/useGetData'

function Authors() {
    const authors = useGetData('/author')

  return (
    <div>
      <SoftwareQuotes />
      
      <h1 className='text-body-secondary'>Authors</h1>

      <ul>
        {
          authors.map((author) => (
            <li key={author}>
              <Link 
                className='text-body-secondary' 
                style={{textDecoration: 'none'}}
                to={`/quotes?author=${encodeURIComponent(author)}`}
              >{author}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Authors