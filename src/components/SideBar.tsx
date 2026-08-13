import { Outlet, NavLink, useNavigate } from 'react-router';

const navs = ['Rides', 'Stats', 'Routes', 'Gear', 'Import'];

const toPath = (nav: string) =>
  nav === 'Rides' ? '/' : `/${nav.toLowerCase()}`;

export const SideBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <div className='flex bg-[#13141F]'>
      {/* Container */}
      <nav className='flex h-dvh w-72 flex-col rounded border-[#282B31] bg-[#13141F]'>
        {/* Logo */}
        <div className='flex items-center px-6 py-7'>
          <img
            className='h-6 w-6 rounded-md'
            src='/attaque_logo.png'
            alt='attaque logo'
          />
          <span className='text-2xl font-bold tracking-tight text-white'>
            ttaque
          </span>
        </div>

        {/* Container Section for Navigations */}
        <div className='flex flex-1 flex-col gap-1 px-3'>
          {navs.map((nav) => (
            <NavLink
              key={nav}
              to={toPath(nav)}
              end
              className={({ isActive }) =>
                [
                  'rounded-xl px-4 py-3 text-lg transition-colors',
                  isActive
                    ? 'bg-[#1E1F30] font-semibold text-white'
                    : 'text-[#8B8E99] hover:bg-[#1A1B27] hover:text-white',
                ].join(' ')
              }
            >
              {nav}
            </NavLink>
          ))}
        </div>

        {/* Account */}
        <div className='flex items-center gap-4 px-6 py-6 cursor-pointer border-t border-t-[#1E1F30]'>
          {/* Image here */}
          <div className='h-11 w-11 rounded-full border border-[#35374A] bg-[#22233200]' />

          {/* Level & Name */}
          <div>
            <p className='uppercase text-gray-100 text-xs'>Level 1</p>
            <p className='text-white text-lg'>Jesus R</p>
          </div>
        </div>

        {/* Sign Out */}
        {/* <div className='flex gap-2'>
          <button
            onClick={handleSignOut}
            type='submit'
            className='border text-center items-center text-base cursor-pointer'
          >
            Sign Out
          </button>
        </div> */}
      </nav>

      {/* react-router children will appear here - Home, Rides, etc. */}
      <Outlet />
    </div>
  );
};
