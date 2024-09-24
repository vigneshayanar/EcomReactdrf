import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Signup = () => {
    const [username,setusername]=useState('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register/',{email:email,username:username,password:password})
        .then(response => {
            console.log('Full response:', response);
            if (response.status === 201) {
              console.log("hii");
              toast.success("succesfully signup")
              toast("succesfully signup")
              navigate('/Login') 
            } else {
              console.log("Unexpected status code:", response.status);
              toast.error("plz try with diffrent credential")
            }
          })
          .catch(error => {
            console.error('Error:', error.response ? error.response : error.message);
            if (error.response){
              const errors=error.response.data;

              if (error.response.data.email){
                toast.error(error.response.data.email[0])
              }
              if (error.response.data.username){
                toast.error(error.response.data.username[0])
              }
              if (error.response.data.password){
                toast.error(error.response.data.password[0])
              }}
            else{
              toast.error(error.message)
            }

          });
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-900 bg-opacity-10 '>
        <div className='flex'>
        <div className='bg-white w-100 rounded  flex flex-col justify-center p-10' style={{height:"300px",width:"300px"}}>
                <h1 className='text-center uppercase font-bold text-xl'>Signup..</h1>
            <form action="" className='p-1' onSubmit={handleSubmit}>
                <div className='p-2 '>
                <input type="email" id='email' placeholder='Email..' className='border p-1 rounded'  value={email} onChange={(e)=>setemail(e.target.value)} required autoComplete='email'/></div>
                <div className='p-2'>
                <input type="text"   id='username' placeholder='useranme..' className='border p-1 rounded 'value={username} onChange={(e)=>setusername(e.target.value)} required autoComplete='username'/></div>
                <div className='p-2'>
                <input type="password"  id='password' placeholder='password..' className='border p-1 rounded' value={password} onChange={(e)=>setpassword(e.target.value)} required autoComplete='new-password'/></div>
                <p className=' text-center text-blue-300 p-1'>Forgot your Password</p>
                <button className='uppercase ml-14  bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>signup</button>
                </form>
        </div>
        <div className='bg-blue-400  rounded  flex flex-col justify-center p-10' style={{height:"300px",width:"300px"}}>
            <h1 className='text-center uppercase font-bold text-xl'>Welcome user</h1>
            <p className='text-gray-300 text-center'>Enter your credential to Signup</p>
            <p className='text-gray-300 text-center'>if you already have account</p>
           <Link to="/Login"> <h2 className='text-center text-gary-900 hover:text-gray-500 underline-offset-1 cursor-pointer' >Login</h2></Link>
        </div>
        </div>
    </div>
  )
}

export default Signup