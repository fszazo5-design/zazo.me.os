import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import FloatingContact from './FloatingContact'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100" dir="rtl">
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  )
}
