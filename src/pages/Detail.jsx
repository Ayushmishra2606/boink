import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Detail = () => {
    const param = useParams()


    const [mydata, setmydata] = useState([])

    const fetching = async (setter) => {
        const response = await axios.get(`https://api.themoviedb.org/3/${param.cat}/${param.id}?language=en-US`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY
            },
            headers: {
                accept: 'application/json'
            }
        })
        setter(response.data)
    }

    useEffect(() => {
        fetching(setmydata)
    }, [])

    const navigate = useNavigate();

    const forBack = () =>{
       navigate(-1);
    }

    return (

        <>
        
            <div className='h-screen w-screen bg-no-repeat bg-cover bg-center  relative   overflow-hidden' style={{ backgroundImage: `url("https://image.tmdb.org/t/p/w500${mydata.backdrop_path}")` }}>
                <div className='absolute inset-0 bg-black/70 h-screen w-screen '></div>
                    <div className='relative md:w-[85%] mx-auto h-screen md:h-[95%] flex md:flex-row flex-col items-center md:gap-15 gap-4 overflow-y-scroll md:overflow-hidden'>
                        <div className='md:min-h-[40%] md:min-w-[auto] m-4'>
                            <img src={`https://image.tmdb.org/t/p/w500${mydata.poster_path}`} alt={mydata.name} className='md:min-h-[full] w-auto' />
                        </div>
                        <div className='text-white flex flex-col  gap-3 md:gap-7 mx-7'>
                            <h1 className='md:text-8xl text-[50px]'>{mydata.name || mydata.title}</h1>
                            <h3 className='md:text-6xl text-[30px]'>{mydata.tagline}</h3>
                            <p className='md:text-2xl text-[15px] max-h-[25vh] overflow:hidden md:line-clamp-5 line-clamp-7'>{mydata.overview}</p>
                            <div className='flex md:flex-row flex-col gap-3 text-[11px] md:text-[13px] font-medium'>
                                <p>Language :&nbsp;{mydata?.spoken_languages?.[0]?.english_name}</p>
                                <p>Released On :&nbsp;{mydata.first_air_date || mydata.release_date}</p>{param.cat=='tv'?<p>Seasons :&nbsp;{mydata?.number_of_seasons}</p>:""}
                                
                                {param.cat=='tv'?<p>Total Episode :&nbsp;{mydata.number_of_episodes}</p>:<p>Duration :&nbsp;{mydata.runtime} Mins</p>}
                                
                            </div>
                            <div className='flex flex-col gap-3 md:text-xl text-[11px]'>
                                <p>Genres : {mydata?.genres?.map(el => el.name).join(", ")}</p>
                                <p>Status :&nbsp;{mydata.status}</p>
                                <div className='flex items-center'><button onClick={forBack} className='text-white items-center h-15 w-30 border-3 border-[#5637c5] bg-[#2c2056] my-4 rounded-xl mx-1.5 text-2xl'>Back</button></div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
            </div>
        </>
    )
}

export default Detail