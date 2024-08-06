import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

const Singleproduct = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { productid } = location.state;

  const handlecart=(id)=>{
    const token=localStorage.getItem("access")
    console.log(token)
    axios.post('http://127.0.0.1:8000/api/cartitem/',
      {Product:id,quantity:1},
      {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }
  )
  .then(response=>{
    console.log("items added to cart",response.data)
    toast.success("Item added to cart!"); 
  })
  .catch(error=>{
    console.error("Error adding item to cart",error.message)
    toast.error("Failed to add item to cart!");
  })}

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/produts/${productid}/`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, [productid]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='flex flex-col bg-blue-900 p-5 rounded shadow-md' style={{ width: 500, height: 500 }}>
        <img
          src={data.image}
          alt={data.name}
          className='w-full h-64 object-cover rounded-t-lg'
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/500x500.png?text=No+Image'; }}
        />
        <div className='p-4 text-center bg-white-200  ' style={{}}>
          <h1 className='text-xl font-bold mb-2'>{data.name}</h1>
          <p className='font-bold'>{data.description}</p>
          <p className='text-green-200 mt-2'>${data.price}</p>
          <button className=' mt-1 px-2 py-1 bg-gray-900 text-white rounded hover:bg-blue-300' onClick={()=>handlecart(data.id)}>Add to cart</button>

        </div>
      </div>
    </div>
  );
};

export default Singleproduct;
