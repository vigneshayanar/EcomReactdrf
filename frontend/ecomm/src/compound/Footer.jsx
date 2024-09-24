import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-8'>
      <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-start'>
        
        <div className='flex flex-col mb-6 md:mb-0'>
          <h5 className='text-2xl font-bold mb-4 text-blue-400'>About Us</h5>
          <p className='text-sm'>
            We are committed to providing the best shopping experience. Our mission is to offer quality products and exceptional service.
          </p>
        </div>

        <div className='flex flex-col mb-6 md:mb-0'>
          <h5 className='text-2xl font-bold mb-4 text-blue-400'>Quick Links</h5>
          <ul className='space-y-2'>
            <li><a href='#' className='hover:text-blue-300'>Home</a></li>
            <li><a href='#' className='hover:text-blue-300'>Shop</a></li>
            <li><a href='#' className='hover:text-blue-300'>About</a></li>
            <li><a href='#' className='hover:text-blue-300'>Contact</a></li>
          </ul>
        </div>

        <div className='flex flex-col mb-6 md:mb-0'>
          <h5 className='text-2xl font-bold mb-4 text-blue-400'>Contact Us</h5>
          <p className='text-sm mb-2 flex items-center'><FaEnvelope className='mr-2' /> Email: <a href='mailto:vigneshayanar@gmail.com' className='hover:text-blue-300'>vigneshayanar@gmail.com</a></p>
          <p className='text-sm mb-2 flex items-center'><FaPhone className='mr-2' /> Phone: <a href='tel+91 8056268154' className='hover:text-blue-300'>+91 8056268154</a></p>
        </div>
      </div>

      <div className='text-center mt-8 border-t border-gray-700 pt-4'>
        <p className='text-sm mb-4'>&copy; {new Date().getFullYear()} EasyBuy. All rights reserved.</p>
        <div className='flex justify-center space-x-4'>
          <a href='https://facebook.com' className='text-blue-700 hover:text-blue-400'><FaFacebook size={24} /></a>
          <a href='https://twitter.com' className='text-blue-400 hover:text-blue-300'><FaTwitter size={24} /></a>
          <a href='https://instagram.com' className='text-pink-500 hover:text-pink-400'><FaInstagram size={24} /></a>
          <a href='https://linkedin.com' className='text-blue-700 hover:text-blue-500'><FaLinkedin size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
