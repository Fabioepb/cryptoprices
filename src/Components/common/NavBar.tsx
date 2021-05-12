import React, { useState } from 'react';
import logo from '../../static/logo.svg';
import handshake from '../../static/handshake.svg';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // NavBar Has Nothing Currently
    <nav className='bg-white shadow dark:bg-indigo-background py-2'>
      <div className='container mx-auto py-2 grid grid-cols-2 md:grid-cols-3 gap-4 bg-white filter drop-shadow-lg items-center'>
        <a className='hidden md:block' href='/'>
          <img src={logo} />
        </a>
        <div className='md:text-center'>
          <a href='/'>
            <img src={handshake} className='md:ml-auto mr-auto' />
          </a>
        </div>
        {/* Mobile Menu */}
        <div className='flex md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            className='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
            aria-label='toggle menu'
          >
            <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
              <path
                fillRule='evenodd'
                d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
