import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Popular = () => {

    const [trendALL, settrendALL] = useState([])

    const fetchD = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?language=en-US`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
                region: "IN",
            },
            headers: {
                accept: 'application/json'
            }
        })
        settrendALL(response.data.results)
    }
    
    useEffect(() => {
        fetchD();
    }, [])
    
  return (
     <div className="m-4 overflow-x-hidden">
                    <h1 className="text-2xl font-bold mb-2 mx-4">Trending This Week</h1>
                    <div className="flex gap-6 overflow-x-auto px-4  scrollbar-hide ">
                        {trendALL.map((movie) => (
    
    
                            <div key={movie.id}>
                                <Link to={'/' + movie.media_type + '/' + movie.media_type + '/details/' + movie.id + '/' + movie.title || movie.name}>
                                    <div className="flex-shrink-0 h-64 w-36 rounded-md ">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-center text-sm mt-1 font-medium">{movie.title || movie.name}</h3></Link>
                            </div>
    
                        ))}
                    </div>
                </div>
  )
}

export default Popular