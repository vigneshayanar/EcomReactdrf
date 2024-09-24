import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from "@/components/ui/toaster"
import Navabar from './compound/Navabar'
import Homepage from './compound/Homepage'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Signup from './compound/Signup'
import Login from './compound/Login'
import MainContext from './context/MainContext'
import Catagory from './compound/Catagory'
import Product from './compound/Product'
import Cart from './compound/Cart'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Singleproduct from './compound/Singleproduct'
import Basedcatagory from './compound/Basedcatagory'
import Checkout from './compound/Checkout'
import Success from './compound/Sucess'
import Cancle from './compound/Cancle'
import { Cancel } from '@radix-ui/react-alert-dialog'
function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Mainpage/>}>
      <Route index element={<Homepage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/catagory' element={<Catagory/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/singleproduct' element={<Singleproduct/>}/>
      <Route path='/basedcatagory' element={<Basedcatagory/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/success' element={<Success />} />    
      <Route path='/cancle' element={<Cancle/>}/>
      </Route>
    </>
  ))
  return (
    <>
  <MainContext>
    <RouterProvider router={router}/>
    <ToastContainer />
    <Toaster />
  </MainContext>
    </>
  )
}

export default App
