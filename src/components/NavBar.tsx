import { Outlet, NavLink, useNavigate } from 'react-router';

const navs = ['Home', 'Rides'];

export const NavBar = () => {
  let navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <>
      <nav className='flex justify-center items-center border p-4'>
        <ul className='flex w-full justify-center gap-5'>
          {navs.map((nav, index) => (
            <NavLink to={nav == 'Home' ? '/' : `/${nav}`}>
              <li key={index}>{nav}</li>
            </NavLink>
          ))}
        </ul>

        <button
          onClick={handleSignOut}
          className='flex border text-center items-center text-base cursor-pointer'
        >
          Sign Out
        </button>
      </nav>

      {/* react-router children will appear here - Home, Rides, etc. */}
      <Outlet />
    </>
  );
};
