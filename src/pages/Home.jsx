import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [activeTab, setActiveTab] = useState('all')
  
  const tabs = [
    { id: 'all', label: 'All Items' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'links', label: 'Links' }
  ]
  
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Organize Your <span className="text-gradient">Tasks & Links</span> in One Place
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-surface-600 dark:text-surface-300 text-lg"
        >
          Manage your to-dos and save important links from various sources, all categorized for easy access.
        </motion.p>
      </section>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-xl bg-surface-100 dark:bg-surface-800 shadow-soft">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-surface-600 dark:text-surface-300 hover:text-surface-800 dark:hover:text-white'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-secondary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MainFeature activeTab={activeTab} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Home