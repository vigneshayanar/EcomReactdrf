import React from 'react';
import backgroundImage from '../assets/homepages.jpg';
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div
      className='flex flex-col items-center text-white shadow-lg'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div
        className='absolute top-1/2 transform -translate-y-1/2 text-black p-10 rounded bg-opacity-80'
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
      >
        <h1 className='text-8xl mb-4 flex justify-center'><TiTick /></h1>
        <p className='text-lg mb-2 font-extrabold'>Verified</p>
        <p className='text-lg mb-2 text-gray-400'>You have successfully verified the payment</p>
        <Link to="/">
          <button className='px-3 py-1 bg-blue-500 font-semibold rounded'>Ok</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
