import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Moon, Sun, Code2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/showcase', label: 'المشاريع' },
  { to: '/system-videos', label: 'شرح الأنظمة' },
  { to: '/content-videos', label: 'صناعة المحتوى' },
  { to: '/admin', label: 'لوحة التحكم' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-600/30">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Dev<span className="text-primary-500">Portfolio</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
