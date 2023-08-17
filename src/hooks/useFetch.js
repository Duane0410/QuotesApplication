import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const response = await fetch(url)
                // console.log('Response - ', response)
                const json = await response.json()
                // console.log('json() - ', json.data)

                setData(json.data)
                setLoading(false)
            } catch (error) {
                // console.log('Catch Error - ', error)
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { loading, error, data }
}

export default useFetch