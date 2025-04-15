import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  Circle, 
  Trash2, 
  Edit, 
  Plus, 
  Link as LinkIcon, 
  Tag, 
  Calendar, 
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'

// Predefined categories with colors
const CATEGORIES = [
  { id: 'self-help', name: 'Self Help', color: '#8b5cf6' },
  { id: 'finance', name: 'Finance', color: '#10b981' },
  { id: 'tutorial', name: 'Tutorial', color: '#3b82f6' },
  { id: 'videos', name: 'Videos', color: '#ef4444' },
  { id: 'trips', name: 'Trips', color: '#f59e0b' },
  { id: 'work', name: 'Work', color: '#6366f1' },
  { id: 'personal', name: 'Personal', color: '#ec4899' }
]

// Priority options
const PRIORITIES = [
  { id: 'low', name: 'Low', color: '#10b981' },
  { id: 'medium', name: 'Medium', color: '#f59e0b' },
  { id: 'high', name: 'High', color: '#ef4444' }
]

const MainFeature = ({ activeTab }) => {
  // State for tasks and links
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the draft and send for review',
        isCompleted: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
        categoryId: 'work'
      },
      {
        id: '2',
        title: 'Research investment options',
        description: 'Look into ETFs and index funds',
        isCompleted: true,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium',
        categoryId: 'finance'
      }
    ]
  })
  
  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem('links')
    return savedLinks ? JSON.parse(savedLinks) : [
      {
        id: '1',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Productivity Tips Video',
        description: 'Great video on improving daily productivity',
        createdAt: new Date().toISOString(),
        categoryId: 'self-help',
        tags: ['productivity', 'habits']
      },
      {
        id: '2',
        url: 'https://www.investopedia.com/terms/i/indexfund.asp',
        title: 'Index Funds Explained',
        description: 'Comprehensive guide to index fund investing',
        createdAt: new Date().toISOString(),
        categoryId: 'finance',
        tags: ['investing', 'beginners']
      }
    ]
  })
  
  // Form states
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [editingItemId, setEditingItemId] = useState(null)
  
  // Form data
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    categoryId: 'work'
  })
  
  const [linkForm, setLinkForm] = useState({
    url: '',
    title: '',
    description: '',
    categoryId: 'self-help',
    tags: ''
  })
  
  // Form validation
  const [taskErrors, setTaskErrors] = useState({})
  const [linkErrors, setLinkErrors] = useState({})
  
  // Filter state
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links))
  }, [links])
  
  // Reset form when closing
  const resetTaskForm = () => {
    setTaskForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      categoryId: 'work'
    })
    setTaskErrors({})
    setEditingItemId(null)
  }
  
  const resetLinkForm = () => {
    setLinkForm({
      url: '',
      title: '',
      description: '',
      categoryId: 'self-help',
      tags: ''
    })
    setLinkErrors({})
    setEditingItemId(null)
  }
  
  // Handle task toggle
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ))
  }
  
  // Handle task deletion
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  
  // Handle link deletion
  const deleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id))
  }
  
  // Handle task edit
  const editTask = (task) => {
    setTaskForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      priority: task.priority,
      categoryId: task.categoryId
    })
    setEditingItemId(task.id)
    setShowTaskForm(true)
  }
  
  // Handle link edit
  const editLink = (link) => {
    setLinkForm({
      url: link.url,
      title: link.title,
      description: link.description,
      categoryId: link.categoryId,
      tags: link.tags.join(', ')
    })
    setEditingItemId(link.id)
    setShowLinkForm(true)
  }
  
  // Handle task form submission
  const handleTaskSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = {}
    if (!taskForm.title.trim()) errors.title = "Title is required"
    if (!taskForm.dueDate) errors.dueDate = "Due date is required"
    
    if (Object.keys(errors).length > 0) {
      setTaskErrors(errors)
      return
    }
    
    if (editingItemId) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingItemId ? {
          ...task,
          title: taskForm.title,
          description: taskForm.description,
          dueDate: new Date(taskForm.dueDate).toISOString(),
          priority: taskForm.priority,
          categoryId: taskForm.categoryId
        } : task
      ))
    } else {
      // Add new task
      const newTask = {
        id: Date.now().toString(),
        title: taskForm.title,
        description: taskForm.description,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(taskForm.dueDate).toISOString(),
        priority: taskForm.priority,
        categoryId: taskForm.categoryId
      }
      setTasks([...tasks, newTask])
    }
    
    // Reset form and close
    resetTaskForm()
    setShowTaskForm(false)
  }
  
  // Handle link form submission
  const handleLinkSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = {}
    if (!linkForm.url.trim()) errors.url = "URL is required"
    if (!linkForm.title.trim()) errors.title = "Title is required"
    
    // Basic URL validation
    if (linkForm.url && !linkForm.url.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
      errors.url = "Please enter a valid URL"
    }
    
    if (Object.keys(errors).length > 0) {
      setLinkErrors(errors)
      return
    }
    
    // Process tags
    const tags = linkForm.tags
      ? linkForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : []
    
    if (editingItemId) {
      // Update existing link
      setLinks(links.map(link => 
        link.id === editingItemId ? {
          ...link,
          url: linkForm.url,
          title: linkForm.title,
          description: linkForm.description,
          categoryId: linkForm.categoryId,
          tags
        } : link
      ))
    } else {
      // Add new link
      const newLink = {
        id: Date.now().toString(),
        url: linkForm.url,
        title: linkForm.title,
        description: linkForm.description,
        createdAt: new Date().toISOString(),
        categoryId: linkForm.categoryId,
        tags
      }
      setLinks([...links, newLink])
    }
    
    // Reset form and close
    resetLinkForm()
    setShowLinkForm(false)
  }
  
  // Filter items based on active tab and category filter
  const filteredTasks = tasks.filter(task => 
    categoryFilter === 'all' || task.categoryId === categoryFilter
  )
  
  const filteredLinks = links.filter(link => 
    categoryFilter === 'all' || link.categoryId === categoryFilter
  )
  
  // Get category by ID
  const getCategoryById = (id) => CATEGORIES.find(cat => cat.id === id) || { name: 'Uncategorized', color: '#94a3b8' }
  
  // Get priority by ID
  const getPriorityById = (id) => PRIORITIES.find(p => p.id === id) || { name: 'Medium', color: '#f59e0b' }
  
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Filter by Category</h2>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowTaskForm(true)
                setShowLinkForm(false)
              }}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={18} />
              <span>New Task</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowLinkForm(true)
                setShowTaskForm(false)
              }}
              className="btn btn-secondary flex items-center gap-2"
            >
              <LinkIcon size={18} />
              <span>New Link</span>
            </motion.button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              categoryFilter === 'all' 
                ? 'bg-surface-800 text-white dark:bg-white dark:text-surface-900' 
                : 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-200'
            }`}
          >
            All
          </motion.button>
          
          {CATEGORIES.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategoryFilter(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                categoryFilter === category.id 
                  ? 'text-white' 
                  : 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-200'
              }`}
              style={categoryFilter === category.id ? { backgroundColor: category.color } : {}}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowTaskForm(false)
              resetTaskForm()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 w-full max-w-md shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">
                {editingItemId ? 'Edit Task' : 'Add New Task'}
              </h2>
              
              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                    className={`input-field ${taskErrors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="Enter task title"
                  />
                  {taskErrors.title && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {taskErrors.title}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description (optional)</label>
                  <textarea
                    value={taskForm.description}
                    onChange={e => setTaskForm({...taskForm, description: e.target.value})}
                    className="input-field min-h-[80px]"
                    placeholder="Enter task description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={e => setTaskForm({...taskForm, dueDate: e.target.value})}
                    className={`input-field ${taskErrors.dueDate ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {taskErrors.dueDate && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {taskErrors.dueDate}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={e => setTaskForm({...taskForm, priority: e.target.value})}
                    className="input-field"
                  >
                    {PRIORITIES.map(priority => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={taskForm.categoryId}
                    onChange={e => setTaskForm({...taskForm, categoryId: e.target.value})}
                    className="input-field"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTaskForm(false)
                      resetTaskForm()
                    }}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                  >
                    {editingItemId ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Link Form Modal */}
      <AnimatePresence>
        {showLinkForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowLinkForm(false)
              resetLinkForm()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 w-full max-w-md shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">
                {editingItemId ? 'Edit Link' : 'Add New Link'}
              </h2>
              
              <form onSubmit={handleLinkSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="text"
                    value={linkForm.url}
                    onChange={e => setLinkForm({...linkForm, url: e.target.value})}
                    className={`input-field ${linkErrors.url ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="https://example.com"
                  />
                  {linkErrors.url && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {linkErrors.url}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={linkForm.title}
                    onChange={e => setLinkForm({...linkForm, title: e.target.value})}
                    className={`input-field ${linkErrors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="Enter link title"
                  />
                  {linkErrors.title && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {linkErrors.title}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description (optional)</label>
                  <textarea
                    value={linkForm.description}
                    onChange={e => setLinkForm({...linkForm, description: e.target.value})}
                    className="input-field min-h-[80px]"
                    placeholder="Enter link description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={linkForm.categoryId}
                    onChange={e => setLinkForm({...linkForm, categoryId: e.target.value})}
                    className="input-field"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={linkForm.tags}
                    onChange={e => setLinkForm({...linkForm, tags: e.target.value})}
                    className="input-field"
                    placeholder="productivity, finance, tutorial"
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLinkForm(false)
                      resetLinkForm()
                    }}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-secondary flex-1"
                  >
                    {editingItemId ? 'Update Link' : 'Add Link'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content based on active tab */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Section */}
        {(activeTab === 'all' || activeTab === 'tasks') && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle className="text-primary" size={20} />
              Tasks
            </h2>
            
            {filteredTasks.length === 0 ? (
              <div className="card-neu p-6 text-center">
                <p className="text-surface-500 dark:text-surface-400">No tasks found. Add your first task!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`card p-4 ${task.isCompleted ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="mt-1 flex-shrink-0 text-surface-400 hover:text-primary transition-colors"
                      >
                        {task.isCompleted ? (
                          <CheckCircle className="text-primary" size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`font-medium ${task.isCompleted ? 'line-through text-surface-400 dark:text-surface-500' : ''}`}>
                            {task.title}
                          </h3>
                          
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => editTask(task)}
                              className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                            >
                              <Edit size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteTask(task.id)}
                              className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <div 
                            className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getCategoryById(task.categoryId).color }}
                          >
                            {getCategoryById(task.categoryId).name}
                          </div>
                          
                          <div 
                            className="px-2 py-0.5 rounded-full text-xs font-medium text-white flex items-center gap-1"
                            style={{ backgroundColor: getPriorityById(task.priority).color }}
                          >
                            <span>{getPriorityById(task.priority).name}</span>
                          </div>
                          
                          <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Links Section */}
        {(activeTab === 'all' || activeTab === 'links') && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <LinkIcon className="text-secondary" size={20} />
              Links
            </h2>
            
            {filteredLinks.length === 0 ? (
              <div className="card-neu p-6 text-center">
                <p className="text-surface-500 dark:text-surface-400">No links found. Add your first link!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLinks.map(link => (
                  <motion.div
                    key={link.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="card p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
                        <LinkIcon size={16} className="text-secondary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <a 
                            href={link.url.startsWith('http') ? link.url : `https://${link.url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {link.title}
                          </a>
                          
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => editLink(link)}
                              className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                            >
                              <Edit size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteLink(link.id)}
                              className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 truncate">
                          {link.url}
                        </p>
                        
                        {link.description && (
                          <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                            {link.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <div 
                            className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: getCategoryById(link.categoryId).color }}
                          >
                            {getCategoryById(link.categoryId).name}
                          </div>
                          
                          {link.tags && link.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {link.tags.map((tag, index) => (
                                <div 
                                  key={index}
                                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 flex items-center gap-1"
                                >
                                  <Tag size={12} />
                                  <span>{tag}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MainFeature