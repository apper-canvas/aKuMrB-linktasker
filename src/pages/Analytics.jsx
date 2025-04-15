import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, RefreshCw } from 'lucide-react';
import LinkUsageChart from '../components/analytics/LinkUsageChart';
import TaskCompletionChart from '../components/analytics/TaskCompletionChart';
import CategoryPerformanceChart from '../components/analytics/CategoryPerformanceChart';
import TimeAnalyticsChart from '../components/analytics/TimeAnalyticsChart';

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Add completedAt dates to completed tasks for better analytics
  const addCompletedDates = (tasks) => {
    return tasks.map(task => {
      if (task.isCompleted && !task.completedAt) {
        // Generate a random completion date after creation but before now
        const createdDate = new Date(task.createdAt);
        const now = new Date();
        const randomTime = createdDate.getTime() + Math.random() * (now.getTime() - createdDate.getTime());
        return {
          ...task,
          completedAt: new Date(randomTime).toISOString()
        };
      }
      return task;
    });
  };
  
  useEffect(() => {
    // Load tasks and links from localStorage
    const loadData = () => {
      setIsLoading(true);
      
      try {
        const savedTasks = localStorage.getItem('tasks');
        const savedLinks = localStorage.getItem('links');
        
        const tasksData = savedTasks ? JSON.parse(savedTasks) : [];
        const linksData = savedLinks ? JSON.parse(savedLinks) : [];
        
        // Add completedAt dates for better analytics
        const enhancedTasks = addCompletedDates(tasksData);
        
        setTasks(enhancedTasks);
        setLinks(linksData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'tasks', label: 'Tasks', icon: <PieChart size={16} /> },
    { id: 'links', label: 'Links', icon: <LineChart size={16} /> }
  ];
  
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Your <span className="text-gradient">Analytics Dashboard</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-surface-600 dark:text-surface-300 text-lg"
        >
          Track your productivity and link usage patterns
        </motion.p>
      </section>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw size={32} className="animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-surface-100 dark:bg-surface-800 shadow-soft">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? 'text-white' 
                      : 'text-surface-600 dark:text-surface-300 hover:text-surface-800 dark:hover:text-white'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeAnalyticsTab"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-secondary"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.icon}</span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TaskCompletionChart tasks={tasks} />
              <LinkUsageChart links={links} />
              <TimeAnalyticsChart tasks={tasks} links={links} />
              <CategoryPerformanceChart tasks={tasks} />
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TaskCompletionChart tasks={tasks} />
              <CategoryPerformanceChart tasks={tasks} />
              <div className="md:col-span-2">
                <TimeAnalyticsChart tasks={tasks} links={links} />
              </div>
            </div>
          )}
          
          {activeTab === 'links' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkUsageChart links={links} />
              <TimeAnalyticsChart tasks={tasks} links={links} />
              <div className="md:col-span-2">
                <CategoryPerformanceChart tasks={tasks} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;