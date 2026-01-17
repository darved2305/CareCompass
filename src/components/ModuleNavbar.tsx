import { Link, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Check what care you need', href: '/check' },
  { label: 'Find nearest hospitals', href: '/find-care' },
  { label: 'Teleconsult / Helplines', href: '/telehelp' },
  { label: 'FAQs / Learn', href: '/learn' },
]

export default function ModuleNavbar() {
  const location = useLocation()

  return (
    <nav className="module-navbar">
      <ul className="module-nav-list">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
          
          return (
            <li key={item.href} className="module-nav-item">
              <Link
                to={item.href}
                className={`module-nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
