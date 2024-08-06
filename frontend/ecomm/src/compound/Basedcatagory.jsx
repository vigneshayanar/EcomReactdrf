import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
const Basedcatagory = ({id}) => {
  const [Data, setData] = useState([])
    const location=useLocation();
    const{Catagoryid}=location.state;
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/produts/`)
      .then(response => {
        console.log(response.data)
        console.log(Catagoryid)
        setData(response.data)
        const upadate=response.data.filter((ids=>Catagoryid===ids.category))
        console.log(upadate)
        console.log(id)
        setData(upadate)
      })
      .catch(error => {
        console.error(error.message)
      })
  }, [])
  const handlecart=(id)=>{
    const token=localStorage.getItem("access")
    console.log(token)
    axios.post(`http://127.0.0.1:8000/api/cartitem/`,
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
  })
  }

  return (
    <div className='bg-black-500 min-h-screen p-5'>
      <div className='flex flex-wrap'>
        {Data.map(d => (
       <Link to="/singleproduct" state={{productid:d.id}}>  <div key={d.id} className='bg-white p-4 m-2 rounded-lg shadow-md' style={{ width: '200px', height: '350px' }}>
            <img
              src={d.image}
              alt={d.name}
              className='w-full h-2/3 object-cover rounded-t-lg'
              onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/200x200.png?text=No+Image'; }}
            />
            <div className='h-1/3 p-2'>
              <h3 className='font-bold'>{d.name}</h3>
              <p className='text-green-600'>${d.price}</p>
              <button className=' mt-1 px-2 py-1 bg-blue-900 text-white rounded hover:bg-blue-300' onClick={()=>handlecart(d.id)}>Add to cart</button>
            </div>
          </div></Link> 
        ))}
      </div>
    </div>
  )
}

export default Basedcatagory
