import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Catagory = () => {
  const [Data, setData] = useState([]);
  const [selectid, setselectid] = useState();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  const handleprdoduct = (id) => {
    console.log(id);
    setselectid(id);
  };

  return (
    <div className='bg-gray-200 min-h-screen p-5'>
      <div className='flex flex-wrap justify-center'>
        {Data.map(d => (
          <Link to="/basedcatagory" state={{ Catagoryid: d.id }} key={d.id}>
            <div 
              onClick={() => handleprdoduct(d.id)} 
              className='bg-white p-4 m-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300' 
              style={{ width: '200px', height: '300px' }}
            >
              <img
                src={d.images}
                alt={d.name}
                className='w-full h-2/3 object-cover rounded-t-lg'
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x200.png?text=No+Image'; }}
              />
              <div className='h-1/3 p-2 flex flex-col justify-between'>
                <h3 className='font-bold text-lg'>{d.name}</h3>
                <p className='text-gray-500'>{d.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catagory;
