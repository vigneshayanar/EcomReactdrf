import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../context/MainContext';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total,settotal]=useState(0)
  const [length,setlength]=useState(0)
  const {price,setprice}=useContext(ApiContext)
  let constotal=0
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get('http://127.0.0.1:8000/api/cartitem/', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setCartItems(response.data)
        console.log(cartItems)
        let calculatedTotal = 0;
        let len=0
        response.data.forEach(item => {
          calculatedTotal += parseFloat(item.product_details.price) * item.quantity;
          len+=1
        });        
        settotal(calculatedTotal)
        setprice(total)
        setlength(len)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCartItems();
  }, []);
  const handledeltecart=(id)=>{
    const token = localStorage.getItem('access');
    console.log('hi')
    axios.delete(`http://127.0.0.1:8000/api/cartitem/${id}/`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    const updtaecartitems=cartItems.filter(item=>item.id!=id);
    setCartItems(updtaecartitems)
    let calculatetotal=0
    updtaecartitems.forEach(item=>{
      calculatetotal+=parseFloat(item.product_details.price)*item.quantity
    })
    settotal(calculatetotal)
  }
  return (
    <div className='min-h-screen bg-gray-100 p-5'>
    <h1 className='text-2xl font-bold text-center mb-5 text-gray-800'>Cart Items</h1>
    <ul className='space-y-4'>
      {cartItems.map(item => (
        <li key={item.id} className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <div className='flex flex-col'>
            <span className='font-semibold text-gray-800'>{item.product_details.name}</span>
            <span className='text-gray-600'>${item.product_details.price}</span>
            <span className='text-gray-500'>Quantity: {item.quantity}</span>
          </div>
          <button 
            className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors' 
            onClick={() => handledeltecart(item.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    <div className='mt-5 flex justify-center font-bold text-lg text-gray-900'>
      Total Price: <span className='ml-2 text-blue-600'>${total.toFixed(2)}</span>
    </div>
   <Link to="/checkout"><div className=' mt-5 flex justify-center text-2xl'> <Button variant="secondary" className=" bg-green-200 px-2 py-1 rounded-lg  transition-colors">Proceed To Buy ({length}items)</Button></div></Link>
  </div>
);
};


export default Cart;
