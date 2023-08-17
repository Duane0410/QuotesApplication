import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SoftwareQuotes from './SoftwareQuotes'
import useGetData from '../../hooks/useGetData'
import axios from 'axios';

function Authors() {
  const authors = useGetData('/author')

  
  const trial1 = async () => {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/places',
      headers: {
        'X-RapidAPI-Key': 'd514c9addemsha3e7f795b7a15afp1b8d79jsn93ac18f76eaf',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const trial2 = async () => {

    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/locale/currencies',
      params: {countryId: 'US'},
      headers: {
        'X-RapidAPI-Key': 'd514c9addemsha3e7f795b7a15afp1b8d79jsn93ac18f76eaf',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const trial3 = async () => {

    const options = {
      method: 'GET',
      url: 'https://openlibrary.org/works/OL45804W/editions.json'
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // trial1()
    // trial2()
    trial3()
  }, [])


  return (
    <div>
      {/* <SoftwareQuotes /> */}
      
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