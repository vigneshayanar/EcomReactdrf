import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiContext } from '../context/MainContext'
const Login = () => {
    const [email,setemail]=useState('')
    const navigate=useNavigate()
    const [password,setpassword]=useState('')
    const [username,setusername]=useState('')
    const{login,error}=useContext(ApiContext);
    const handlesunbmit=(e)=>{
      e.preventDefault();
      console.log("hi")
      login(email,password,username)
      if (error){
        navigate('/Login')
      }
      else{
      navigate('/')}
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-900 bg-opacity-10 '>
        <div className='flex'>
        <div className='bg-white w-100 rounded  flex flex-col justify-center p-10' style={{height:"300px",width:"300px"}}>
                <h1 className='text-center uppercase font-bold text-xl'>Login..</h1>
            <form action="" className='p-1' onSubmit={handlesunbmit}>
                <div className='p-2 '>
                <input type="email" id='email' placeholder='Email..' className='border p-1 rounded'  value={email} onChange={(e)=>setemail(e.target.value)} required autoComplete='email'/></div>
                <div className='p-2 '>
                <input type="name" id='email' placeholder='username..' className='border p-1 rounded'  value={username} onChange={(e)=>setusername(e.target.value)} required autoComplete='username'/></div>
                <div className='p-2'>
                <input type="password"  id='password' placeholder='password..' className='border p-1 rounded' value={password} onChange={(e)=>setpassword(e.target.value)} required autoComplete='new-password'/></div>
                <p className=' text-center text-blue-300 p-1'>Forgot your Password</p>
                <button className='uppercase ml-14  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' >Login</button>
              </form>
        </div>
        <div className='bg-blue-400  rounded  flex flex-col justify-center p-10' style={{height:"300px",width:"300px"}}>
            <h1 className='text-center uppercase font-bold text-xl'>Welcome Back</h1>
            <p className='text-gray-300 text-center'>Enter your credential to Login</p>
            <p className='text-gray-300 text-center'>new user </p>
          <Link to="/Signup"> <h2 className='text-center px-2 py-1 text-gary-900 hover:text-gray-500 underline-offset-1 cursor-pointer' >signup</h2></Link> 
        </div>
        </div>
    </div>
  )
}

export default Login