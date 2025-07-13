import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'
import { useNavigate } from 'react-router'



const Movie = () => {

    const [popular, setpopular] = useState([])
    const [topRated, settopRated] = useState([])
    const [upcoming, setupcoming] = useState([])
    const cat = "movie"
    const type = "movie"

    const [sc, setsc] = useState('')

    const inp = (e) => {
        const query = e.target.value.trim()
        setsc(query)
    }

    const navigate = useNavigate();

    const loadCat = (e) =>{
        navigate(`/${type}/${e.target.value}/${e.target.options[e.target.selectedIndex].text}`)
    }

    const fetchMOVIES = async (type, setter) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${type.toLowerCase()}?language=en-US&page=1`, {
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
        fetchMOVIES('popular', setpopular);
        fetchMOVIES('top_rated', settopRated);
        fetchMOVIES('upcoming', setupcoming);
    }, [])

    return (
        <>
        <div className='overflow-x-hidden w-screen schrollbar-hide'>
            <Navbar />
            <div className='flex flex-row  justify-between items-center  w-screen overflow-x-hidden'>
                <div className='flex flex-row md:gap-2.5 gap-0.5 w-3/4'>
                    <input type="text" placeholder='Search Movies' className='md:w-xl w-[75%] md:h-15 h-9 md:mx-4 mx-1 my-4 border-4 border-[#5637c5] rounded-2xl' onInput={inp} />
                    <Link to={'/search/' + sc}><button className='md:h-15 md:w-30 h-9 w-[20] border-3 border-[#5637c5] bg-[#2c2056] my-4 rounded-xl mx-1.5' disabled={sc.length > 1 ? false : true}>SEARCH</button></Link></div>
                <span className='w-1/3 flex flex-row-reverse'>
                    <select name="genres" onChange={loadCat} className='w-full md:w-40 md-p-10 md:h-14 h-10 border-2 border-[#5637c5] m-6 focus:outline-none focus:ring-none text-[#B000F0] focus:ring-[#2c2056]'>
                        <option value="">Select Genre</option>
                        <option value="28">Action</option>
                        <option value="12">Adventure</option>
                        <option value="16">Animation</option>
                        <option value="35">Comedy</option>
                        <option value="80">Crime</option>
                        <option value="99">Documentary</option>
                        <option value="18">Drama</option>
                        <option value="10751">Family</option>
                        <option value="14">Fantasy</option>
                        <option value="36">History</option>
                        <option value="27">Horror</option>
                        <option value="10402">Music</option>
                        <option value="9648">Mystery</option>
                        <option value="10749">Romance</option>
                        <option value="878">Science Fiction</option>
                        <option value="10770">TV Movie</option>
                        <option value="53">Thriller</option>
                        <option value="10752">War</option>
                        <option value="37">Western</option>
                    </select>
                </span>
            </div>
            
            <div className="m-4 overflow-x-auto schrollbar-hide">
                <h1 className="text-2xl font-bold mb-2 mx-4">Popular Movies</h1>
                <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                    {popular.map((movie) => (


                        <div key={movie.id}>
                            <Link to={'/' + cat + '/' + type + '/details/' + movie.id + '/' + movie.title}>
                                <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-center text-sm mt-1 font-medium">{movie.title}</h3></Link>
                        </div>

                    ))}
                </div>
            </div>
            <div className="m-4 overflow-x-hidden">
                <h1 className="text-2xl font-bold mb-2 mx-4">Top Rated Movies</h1>
                <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                    {topRated.map((movie) => (
                        <div key={movie.id}>
                            <Link to={'/' + cat + '/' + type + '/details/' + movie.id + '/' + movie.title}>
                                <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-center text-sm mt-1 font-medium">{movie.title}</h3></Link>
                        </div>

                    ))}
                </div>
            </div>
            <div className="m-4 overflow-x-hidden">
                <h1 className="text-2xl font-bold mb-2 mx-4">Upcoming Movies</h1>
                <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                    {upcoming.map((movie) => (
                        <div key={movie.id}>
                            <Link to={'/' + cat + '/' + type + '/details/' + movie.id + '/' + movie.title}>
                                <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <h3 className="text-center text-sm mt-1 font-medium">{movie.title}</h3></Link>
                        </div>

                    ))}
                </div>
            </div>
            </div>

        </>
    )
}

export default Movie