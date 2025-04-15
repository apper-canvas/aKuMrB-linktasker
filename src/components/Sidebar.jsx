import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Zap, ExternalLink, CheckSquare, Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { path: '/analytics', icon: <BarChart2 className="h-5 w-5" />, label: 'Analytics' },
    { path: '/streak', icon: <Zap className="h-5 w-5" />, label: 'Streak' },
  ];

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 }
  };

  const iconVariants = {
    rotate: { rotate: 180 },
    stop: { rotate: 0 }
  };

  const labelVariants = {
    visible: { opacity: 1, x: 0, display: 'block' },
    hidden: { 
      opacity: 0, 
      x: -10, 
      transitionEnd: { display: 'none' } 
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div 
        className="fixed top-0 left-0 h-full bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 z-20 shadow-sm"
        initial={isCollapsed ? "collapsed" : "expanded"}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="shrink-0 h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <CheckSquare className="h-5 w-5 text-white" />
              </div>
              <motion.span 
                className="ml-3 font-bold text-lg"
                variants={labelVariants}
                initial={isCollapsed ? "hidden" : "visible"}
                animate={isCollapsed ? "hidden" : "visible"}
                transition={{ duration: 0.2 }}
              >
                LinkTasker
              </motion.span>
            </div>
            <motion.button
              className="hidden md:block text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-100"
              onClick={toggleSidebar}
              variants={iconVariants}
              animate={isCollapsed ? "stop" : "rotate"}
              transition={{ duration: 0.3 }}
            >
              <Menu className="h-5 w-5" />
            </motion.button>
            <button 
              className="md:hidden text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-100"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 py-6">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center pl-4 pr-2 py-3 rounded-lg ${
                      isActive 
                        ? 'bg-surface-100 dark:bg-surface-700 text-primary dark:text-primary-400' 
                        : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors'
                    }`}
                  >
                    <div className={`${isActive ? 'text-primary dark:text-primary-400' : ''}`}>
                      {item.icon}
                    </div>
                    <motion.span 
                      className="ml-3 font-medium"
                      variants={labelVariants}
                      initial={isCollapsed ? "hidden" : "visible"}
                      animate={isCollapsed ? "hidden" : "visible"}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                    {isActive && (
                      <motion.div 
                        className="ml-auto h-2 w-2 rounded-full bg-primary-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-surface-200 dark:border-surface-700">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center pl-4 pr-2 py-2 rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors`}
            >
              {darkMode ? 
                <Sun className="h-5 w-5 text-amber-500" /> : 
                <Moon className="h-5 w-5 text-indigo-500" />
              }
              <motion.span 
                className="ml-3 font-medium"
                variants={labelVariants}
                initial={isCollapsed ? "hidden" : "visible"}
                animate={isCollapsed ? "hidden" : "visible"}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </motion.span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed right-0 top-0 h-full w-[250px] bg-white dark:bg-surface-800 z-40 md:hidden shadow-xl"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="p-4 flex justify-between items-center border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 font-bold text-lg">LinkTasker</span>
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-4">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg ${
                        isActive 
                          ? 'bg-surface-100 dark:bg-surface-700 text-primary-600 dark:text-primary-400' 
                          : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700'
                      }`}
                    >
                      <div className={`${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                        {item.icon}
                      </div>
                      <span className="ml-3 font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div 
                          className="ml-auto h-2 w-2 rounded-full bg-primary-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="absolute bottom-0 w-full p-4 border-t border-surface-200 dark:border-surface-700">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-700"
              >
                {darkMode ? 
                  <Sun className="h-5 w-5 text-amber-500" /> : 
                  <Moon className="h-5 w-5 text-indigo-500" />
                }
                <span className="ml-3 font-medium">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;