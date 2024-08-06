import React from 'react'
import Navabar from '../compound/Navabar'
import { Outlet } from 'react-router-dom'
import Footer from '../compound/Footer'
const Mainpage = () => {
  return (
    <div>
        <Navabar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Mainpage