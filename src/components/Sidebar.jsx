import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BarChart, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  Link as LinkIcon,
  CheckSquare,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' }
  };
  
  const menuItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart size={20} /> },
    { path: '/tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
    { path: '/links', label: 'Links', icon: <LinkIcon size={20} /> },
  ];
  
  const secondaryMenuItems = [
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    { path: '/help', label: 'Help', icon: <HelpCircle size={20} /> },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.div 
      className="h-screen fixed top-0 left-0 z-20 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 flex flex-col"
      initial={isCollapsed ? "collapsed" : "expanded"}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header with logo */}
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0">
            LT
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text whitespace-nowrap">
              LinkTasker
            </h1>
          )}
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 mb-2 px-4">
          {!isCollapsed && <div className="h-px bg-surface-200 dark:bg-surface-700"></div>}
        </div>
        
        <ul className="space-y-1 px-2">
          {secondaryMenuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with dark mode toggle */}
      <div className="p-4 border-t border-surface-200 dark:border-surface-700">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className={`
            ${isCollapsed ? 'justify-center' : 'justify-between'} 
            w-full flex items-center gap-3 px-3 py-2 rounded-lg
            bg-surface-100 dark:bg-surface-700 
            hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors
          `}
          aria-label="Toggle dark mode"
        >
          <span className="flex-shrink-0">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </span>
          {!isCollapsed && (
            <span className="whitespace-nowrap">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;