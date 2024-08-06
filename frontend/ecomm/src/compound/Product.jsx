import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Product = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/produts/')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  const handlecart = (id) => {
    const token = localStorage.getItem('access');
    console.log(token);
    axios.post('http://127.0.0.1:8000/api/cartitem/',
      { Product: id, quantity: 1 },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(response => {
        console.log('items added to cart', response.data);
        toast.success('Item added to cart!');
      })
      .catch(error => {
        console.error('Error adding item to cart', error.message);
        toast.error('Failed to add item to cart!');
      });
  };

  return (
    <div className='bg-gray-200 min-h-screen p-5'>
      <div className='flex flex-wrap justify-center'>
        {Data.map(d => (
          <Link to="/singleproduct" state={{ productid: d.id }} key={d.id}>
            <div className='bg-white items-center p-4 m-2 gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300' style={{ width: '250px', height: '400px' }}>
              <img
                src={d.image}
                alt={d.name}
                className='w-full h-2/3 object-cover rounded-t-lg'
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x200.png?text=No+Image'; }}
              />
              <div className='h-1/3 p-2 flex flex-col justify-between'>
                <div>
                  <h3 className='font-bold text-lg'>{d.name}</h3>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-green-600 text-xl'>${d.price}</p>
                  <button className='mt-1 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition-colors duration-300' onClick={(e) => { e.preventDefault(); handlecart(d.id); }}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
