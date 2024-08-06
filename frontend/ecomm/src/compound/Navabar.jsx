import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApiContext } from '../context/MainContext';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { GrUserNew } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { enter, Logout } = useContext(ApiContext);

  const handleMouseOver = (e) => {
    e.target.style.fontSize = '25px';
  };

  const handleMouseOut = (e) => {
    e.target.style.fontSize = '20px';
  };

  return (
    <div className='flex justify-between items-center h-16 bg-white-700 px-10 shadow-md'>
      <div>
        <Link to={'/'}>
          <div className='cursor-pointer text-2xl text-black-900 font-bold'>
            Easy<span className='text-red-500 uppercase'>B</span>uy
          </div>
        </Link>
      </div>
      <div className='flex gap-4'>
        {!enter ? (
          <>
            <Link to='/Login'>
              <div
                className='cursor-pointer transition-all flex  '
                style={{ fontSize: '20px' }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <div>Login</div><IoIosLogIn  className='mt-2 '/>
              </div>
            </Link>
            <Link to='/signup'>
              <div
                className='cursor-pointer  flex transition-all'
                style={{ fontSize: '20px' }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
              <div>Signup</div><GrUserNew className='mt-2' />

              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to='/catagory'>
              <div
                className='cursor-pointer transition-all'
                style={{ fontSize: '20px' }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                Catagory
              </div>
            </Link>
            <Link to='/product'>
              <div
                className='cursor-pointer transition-all'
                style={{ fontSize: '20px' }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                Products
              </div>
            </Link>
            <Link to='/'>
              <div
                className='cursor-pointer transition-all flex'
                style={{ fontSize: '20px' }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={Logout}
              >
                <div>Logout</div><CiLogout className='mt-2'/>

              </div>
            </Link>
            <Link to='/cart'>
              <div
                className='cursor-pointer transition-all flex '
                style={{ fontSize: '20px' }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
           <div>Cart </div>  <FaShoppingCart  className='mt-2'/>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
