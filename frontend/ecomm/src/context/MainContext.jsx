import axios from 'axios'
import React, { Children, createContext, useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export const ApiContext=createContext()

const MainContext = ({children}) => {
   const [email,setemail]=useState('')
   const [error,seterror]=useState()
    const [password,setpassword]=useState('')
    const [enter,setenter]=useState(false)
    const login=(email,password,username)=>{
    axios.post("http://127.0.0.1:8000/api/token/",{email:email,password:password,username:username})
    .then(response=>{
      console.log(response.data)
      const access=response.data.access
      setenter(true)
      localStorage.setItem("access",access)
      const get=localStorage.getItem("access")
      console.log(get)
      seterror(true)
      toast.success('Successfully login')
    })
    .catch(error=>{
      console.error(error.message)
      toast.error("plz check the credential")
      seterror(false)
    })
  }
  const Logout=()=>{
    localStorage.removeItem("access");
    setenter(false)
   toast.error("successfully logged out")
  };

  return (
    <ApiContext.Provider value={{email,password,setemail,setpassword,login,enter,Logout,setenter,error,enter}}>
      {children}
    </ApiContext.Provider>
  )
}

export default MainContext