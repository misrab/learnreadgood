import { useState } from 'react'
import './Navbar.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'practice', label: 'Practice' },
  { id: 'about', label: 'About' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <button
        className="navbar-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={isOpen ? 'open' : ''}>
        {navItems.map(item => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

