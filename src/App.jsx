import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import Analytics from './pages/Analytics'
import Streak from './pages/Streak'
import NotFound from './pages/NotFound'
import Sidebar from './components/Sidebar'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors duration-300">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="flex-1 ml-[72px] md:ml-[240px] transition-all duration-300">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
          <div className="px-4 py-3 flex justify-between items-center">
            <div>
              {/* Page title could go here if needed */}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Right side header controls can go here */}
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/streak" element={<Streak />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="border-t border-surface-200 dark:border-surface-700 py-6 mt-12">
          <div className="px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
            <p>© {new Date().getFullYear()} LinkTasker. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App