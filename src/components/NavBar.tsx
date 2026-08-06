import { type ReactNode } from "react";

const navs = ['Home', 'Rides']

export const NavBar = () => {
  return (
    <nav className="flex justify-center border p-4">
      <ul className="flex gap-5">
        {
          navs.map(nav => (
            <li>{nav}</li>
          ))
        }
      </ul>
    </nav>
  )
}