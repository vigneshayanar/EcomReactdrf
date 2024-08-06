import React from 'react';
import backgroundImage from '../assets/homepages.jpg';

const Homepage = () => {
  return (
    <div
      className='flex flex-col  items-center text-white shadow-lg'
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
        <h1 className='text-4xl mb-4'>Hi, Welcome to EasyBuy!</h1>
        <p className='text-lg mb-2'>Your one-stop shop for all your needs.</p>
        <p className='text-lg mb-2'>Discover amazing products and deals.</p>
        <p className='text-lg mb-6'>Enjoy a seamless shopping experience.</p>
        
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-2'>Get up to 30% off!</h2>
          <p className='text-lg mb-4'>Limited time offer on select items.</p>
          <button className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600'>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
