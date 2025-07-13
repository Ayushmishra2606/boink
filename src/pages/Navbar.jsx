import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/boink.png'

const Navbar = () => {
  return (
    <nav className='bg-[#0D0332] p-7 h-14 flex flex-row justify-between items-center  w-[100vw] overflow-x-hidden overflow-y-hidden'>
        <span className=' h-auto w-[20%]'><img src={logo} alt="logo" className='md:h-28 w-full h-full object-contain' /></span>
        <span className='flex flex-row-reverse gap-6 w-2/3 md:mx-17 '>
            <Link to={'/'}>Home</Link>
            <Link to={"/movie"}>Movies</Link>
            <Link to={"/tv"}>TV</Link>
        </span>
    </nav>
  )
}

export default Navbar