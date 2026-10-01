import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Showcase from './pages/Showcase'
import SystemVideos from './pages/SystemVideos'
import ContentVideos from './pages/ContentVideos'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return <ThemeProvider><BrowserRouter><Routes>
    <Route path="/control-panel" element={<AdminDashboard />} />
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/system-videos" element={<SystemVideos />} />
      <Route path="/content-videos" element={<ContentVideos />} />
    </Route>
  </Routes></BrowserRouter></ThemeProvider>
}
export default App
