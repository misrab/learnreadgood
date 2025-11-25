import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]

export function Navbar({ isOpen, onClose }) {
  return (
    <nav className="navbar">
      <ul className={isOpen ? 'open' : ''}>
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
