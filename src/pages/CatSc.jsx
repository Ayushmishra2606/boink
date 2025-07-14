import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router'

const CatSc = () => {

    const params = useParams();

    const [sr, setsr] = useState([])
    const [disA, setdisA] = useState(true)

    const page = useRef(1)

    const fetchD = async (type, cat , page) => {
        const resp = await axios.get(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&watch_region=IN&with_genres=${cat}`, {
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
        fetchD(params.type, params.cat , page.current)
    }, [])
    const load = () => {
        page.current = page.current + 1;
        fetchD(params.type, params.cat , page.current)
        setdisA(false)
    }
    const prev = () => {
        if (page.current <= 1) {
            setdisA(true)
        }
        page.current = page.current - 1;
        fetchD(params.type, params.cat , page.current)
    }



    return (
        <>
            <Navbar />
            <h1 className='m-7 text-3xl font-bold'>{params.catname}</h1>
            <div className="m-4 flex justify-center items-center flex-row gap-8 relative">
                <button className='h-28 w-10 border-2 border-[#5637c5] bg-[#2c2056] rounded-2xl my-4 fixed top-85 left-8' onClick={prev} disabled={disA}>&lt;</button>
                <div className="flex gap-6 flex-row flex-wrap w-3/4 justify-center items-center mx-auto">
                    {sr.length === 0 ? (
                        <div className="text-center w-full text-lg font-semibold text-gray-600">
                            NO MOVIE OR SHOW OF SUCH NAME
                        </div>
                    ) : (
                        sr.map((ele) => (
                            <div key={ele.id || ele.credit_id}>
                                <Link to={'/' + params.type + '/' + params.type + '/details/' + ele.id + '/' + ele.name || ele.title}>
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

export default CatSc