import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Navbar from './Navbar'

const Tv = () => {

    const [today, settoday] = useState([])
    const [topRated, settopRated] = useState([])
    const [popular, setpopular] = useState([])
    const [onAir, setonAir] = useState([])
    const cat = "tv";
    const type = 'tv';

    const [sc, setsc] = useState('')
    const [dabled, setdabled] = useState(true)

    const inp = (e) => {
        const query = e.target.value.trim()
        setsc(query)
        if (query.length > 1) {
            setdabled(false)
        } else {
            setdabled(true)
        }
    }

    const navigate = useNavigate();

    const loadCat = (e) =>{
        navigate(`/${type}/${e.target.value}/${e.target.options[e.target.selectedIndex].text}`)
    }

    const fetchTV = async (type, setter) => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${type.toLowerCase()}?language=en-US&page=1`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
                region: "IN",
            },
            headers: {
                accept: 'application/json'
            }
        })
        setter(response.data.results)
    }

    useEffect(() => {
        fetchTV('airing_today', settoday);
        fetchTV('on_the_air', setonAir);
        fetchTV('popular', setpopular);
        fetchTV('top_rated', settopRated);
    }, [])


    return (
        <>
            <Navbar />
            <div className='flex flex-row justify-between items-center w-screen overflow-x-hidden'>
                <div className='flex flex-row md:gap-2.5 gap-0.5 w-3/4'>
                    <input type="text" placeholder='Search Tv show' className='md:w-xl w-[75%] md:h-15 h-9 md:mx-4 mx-1 my-4 border-4 border-[#5637c5] rounded-2xl' onInput={inp} />
                    <Link to={'/search/' + sc}><button className='md:h-15 md:w-30 h-9 w-[75px] border-3 border-[#5637c5] bg-[#2c2056] my-4 rounded-xl mx-1.5' disabled={dabled}>SEARCH</button></Link></div>
                    <span>
                        <select name="genres" id="genre-select" onChange={loadCat} className='w-28 md:w-40 md-p-10 md:h-14 h-10 border-2 border-[#5637c5] m-6 focus:outline-none focus:ring-none text-[#B000F0] focus:ring-[#2c2056]'>
                        <option value="" > Select Genre</option>
                        <option value="10759">Action & Adventure</option>
                        <option value="16">Animation</option>
                        <option value="35">Comedy</option>
                        <option value="80">Crime</option>
                        <option value="99">Documentary</option>
                        <option value="18">Drama</option>
                        <option value="10751">Family</option>
                        <option value="10762">Kids</option>
                        <option value="9648">Mystery</option>
                        <option value="10763">News</option>
                        <option value="10764">Reality</option>
                        <option value="10765">Sci-Fi & Fantasy</option>
                        <option value="10766">Soap</option>
                        <option value="10767">Talk</option>
                        <option value="10768">War & Politics</option>
                        <option value="37">Western</option>
                    </select>
                    </span>
            </div>
            <div className="m-4">
                <h1 className="text-2xl font-bold mb-2 mx-4">Airing Today</h1>
                <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                    {today.map((movie) => (
                        <div key={movie.id}>

                            <Link to={'/' + cat + '/' + type + '/details/' + movie.id + '/' + movie.name}>
                                <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-center text-sm mt-1 font-medium">{movie.name}</h3></Link>
                        </div>

                    ))}
                </div>
            </div>
            <div className="m-4">
                <h1 className="text-2xl font-bold mb-2 mx-4">On The Air</h1>
                <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                    {onAir.map((movie) => (
                        <div key={movie.id}>

                            <Link to={'/' + cat + '/' + type + '/details/' + movie.id + '/' + movie.name}>
                                <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-center text-sm mt-1 font-medium">{movie.name}</h3></Link>
                        </div>

                    ))}
                </div>
            </div>
            <div className="m-4">
                <h1 className="text-2xl font-bold mb-2 mx-4">Popular</h1>
                <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                    {popular.map((movie) => (
                        <div key={movie.id}>

                            <Link to={'/' + cat + '/' + type + '/details/' + movie.id + '/' + movie.name}>

                                <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-center text-sm mt-1 font-medium">{movie.name}</h3> </Link>
                        </div>

                    ))}
                </div>
            </div>
            <div className="m-4">
                <h1 className="text-2xl font-bold mb-2 mx-4">Top Rated</h1>
                <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                    {topRated.map((movie) => (
                        <div key={movie.id}>
                            <Link to={'/' + cat + '/' + type + '/details/' + movie.id + '/' + movie.name}>

                                <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-center text-sm mt-1 font-medium">{movie.name}</h3></Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Tv