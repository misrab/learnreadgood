import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Navbar({ isOpen, onClose }: NavbarProps) {
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
