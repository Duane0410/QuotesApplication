import { useEffect, useState } from 'react'
import axios from 'axios'

const useGetData = (url) => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`https://quotes-vfas.onrender.com`+`${url}`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
                url.includes('search')
                    ? setData([{
                        _id: 404,
                        quote: 'Error retreiving data...',
                        author: 'Developer'
                    }])
                    : setData(['Error retreiving data...'])
            })
    }, [url])

  return data
}

export default useGetData