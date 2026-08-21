import { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';

const navs = ['Rides', 'Stats', 'Routes', 'Gear', 'Import'];

export const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    // This element is the layout
    <div className='flex bg-surface min-h-svh'>
      {/* Trigger - Mobile Only */}
      <button
        className='lg:hidden fixed top-0 left-0 z-60 p-4 '
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <X className='text-white' />
        ) : (
          <Menu className='text-white' />
        )}
      </button>

      {/* Container */}
      <nav
        className={`flex flex-col bg-panel
          max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:items-center max-lg:justify-center
          ${isOpen ? 'max-lg:flex' : 'max-lg:hidden'}
          lg:flex lg:w-72 lg:border-r lg:border-border`}
      >
        {/* Logo */}
        <div className='flex items-center px-6 py-7'>
          <img
            className='h-10 w-10'
            src='/attaque-lime.png'
            alt='attaque logo'
          />
          <span className='text-2xl font-bold text-white'>
            ttaque
          </span>
        </div>

        {/* Container Section for Navigations */}
        <div className='flex flex-1 flex-col gap-1 px-3'>
          {navs.map((nav) => (
            <NavLink
              key={nav}
              to={nav === 'Rides' ? '/' : `/${nav.toLowerCase()}`}
              end
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-lg transition-colors ${
                  isActive
                    ? 'bg-active font-semibold text-white'
                    : 'text-muted hover:bg-hover hover:text-white'
                }`
              }
            >
              {nav}
            </NavLink>
          ))}
        </div>

        {/* Account */}
        <div className='flex items-center gap-4 px-6 py-6 cursor-pointer lg:border-t lg:border-t-active'>
          {/* Image here */}
          <div className='h-11 w-11 rounded-full border border-outline' />

          {/* Level & Name */}
          <div>
            <p className='uppercase text-gray-100 text-xs'>Level 1</p>
            <p className='text-white text-lg'>Jesus R</p>
          </div>
        </div>
      </nav>

      {/* react-router children will appear here - Home, Rides, etc. */}
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
};
