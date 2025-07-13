import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import Navbar from './Navbar'
import { Link } from 'react-router'

const Search = () => {
    const query = useParams()
    const type = 'search'

    const [sr, setsr] = useState([])
    const [disA, setdisA] = useState(true)

    const page = useRef(1)

    const fetchD = async (query, page) => {
        if (query.length <= 2) {
            return;
        }
        const resp = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}&language=en-US&page=${page}`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY
            },
            headers: {
                accept: 'application/json'
            }
        })
        setsr(resp.data.results)
    }


    useEffect(() => {
        fetchD(query.query, page.current)
    }, [])

    const load = () => {
        page.current = page.current + 1;
        fetchD(query.query, page.current)
        setdisA(false)
    }
    const prev = () => {
        if (page.current <= 1) {
            setdisA(true)
        }
        page.current = page.current - 1;
        fetchD(query.query, page.current)
    }

    return (
        <>
            <Navbar />
            <h1 className='m-7 text-3xl font-bold'>Results For {query.query}</h1>
            <div className="m-4 flex justify-center items-center flex-row gap-8 relative">
                <button className='h-28 w-10 border-2 border-[#5637c5] bg-[#2c2056] rounded-2xl my-4 fixed top-85 left-8' onClick={prev} disabled={disA}>&lt;</button>
                <div className="flex gap-6 flex-row flex-wrap w-3/4 mx-auto justify-center items-center">
                    {sr.length === 0 ? (
                        <div className="text-center w-full text-lg font-semibold text-gray-600">
                            NO MOVIE OR SHOW OF SUCH NAME
                        </div>
                    ) : (
                        sr.filter(ele => ele.media_type !== 'person').map((ele) => (
                                <div key={ele.id || ele.credit_id}>
                                    <Link to={'/' + ele.media_type + '/' + type + '/details/' + ele.id + '/' + query.query}>
                                        <div className="h-64 w-36">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                                                alt={ele.name || ele.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-center text-sm mt-1 w-36 font-medium">
                                            {ele.name || ele.title}
                                        </h3></Link>
                                </div>
                            ))
                    )}
                </div>
                <button className='h-28 w-10 border-2 border-[#5637c5] bg-[#2c2056] rounded-2xl my-4 fixed top-85 right-8' onClick={load} disabled={sr.length < 20 ? true : false}>&gt;</button>
            </div>
        </>
    )
}

export default Search