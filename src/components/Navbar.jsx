import './Navbar.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'practice', label: 'Practice' },
  { id: 'about', label: 'About' },
]

export function Navbar({ isOpen, onClose }) {
  return (
    <nav className="navbar">
      <ul className={isOpen ? 'open' : ''}>
        {navItems.map(item => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

