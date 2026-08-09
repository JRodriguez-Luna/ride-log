import { Outlet, NavLink } from 'react-router';

const navs = ['Home', 'Rides'];

export const NavBar = () => {
  return (
    <>
      <nav className='flex justify-center border p-4'>
        <ul className='flex gap-5'>
          {navs.map((nav, index) => (
            <NavLink to={nav == 'Home' ? '/' : `/${nav}`}>
              <li key={index}>{nav}</li>
            </NavLink>
          ))}
        </ul>
      </nav>

      {/* react-router children will appear here - Home, Rides, etc. */}
      <Outlet />
    </>
  );
};
