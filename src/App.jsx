import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import GDPR from './pages/GDPR'
import NotFound from './pages/NotFound'

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
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
              LT
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              LinkTasker
            </h1>
          </Link>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t border-surface-200 dark:border-surface-700 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center flex-wrap gap-4 text-sm">
              <Link 
                to="/privacy" 
                className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-surface-300 dark:text-surface-600">•</span>
              <Link 
                to="/terms" 
                className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-surface-300 dark:text-surface-600">•</span>
              <Link 
                to="/gdpr" 
                className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                  EU
                </span>
                GDPR Compliance
              </Link>
            </div>
            <p className="text-center text-surface-500 dark:text-surface-400 text-sm">
              © {new Date().getFullYear()} LinkTasker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App