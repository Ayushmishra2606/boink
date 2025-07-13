import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import Navbar from './Navbar'
import bgimg from '../assets/background.jpg'
import Popular from './Popular'

const Home = () => {

    const [sc, setsc] = useState('')

    const inp = (e) => {
        const query = e.target.value.trim()
        setsc(query)
    }

    return (
        <>
            <Navbar />
            <div className='w-screen h-[40vh] bg-no-repeat bg-cover bg-center ' style={{ backgroundImage: `url(${bgimg})` }}>
                <div className='bg-black/60 w-screen h-[40vh] '>
                    <div className='flex flex-col items-center justify-center text-[#e49bff]'>
                        <h1 className='text-3xl my-4 text-center'><b>boink</b> , Unlimited movies, TV shows and more</h1>
                        <p className='text-xl'>A mini project for practicing react</p>
                        <div className='flex flex-row w-screen h-3/4 mx-auto justify-center my-9' >
                            <input type="text" placeholder='Search' className='md:w-xl w-l h-15 mx-4 my-4 border-4 border-[#5637c5] rounded-2xl placeholder:text-[#e49bff] placeholder:text-2xl placeholder:p-5' onInput={inp} />
                            <Link to={'/search/' + sc}><button className='h-15 w-30 border-3 border-[#5637c5] bg-[#2c2056] my-4 rounded-xl mx-1.5' disabled={sc.length > 1 ? false : true}>Search</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-screen h-2 bg-[#0D0332] border-3 border-[#0d0c13]'>
            </div>
            <Popular />
        </>
    )
}

export default Home