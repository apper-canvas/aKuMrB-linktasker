import { format, parseISO, isAfter, compareAsc, subDays, isSameDay, differenceInDays, isBefore, addDays } from 'date-fns';

// Predefined categories with colors
export const CATEGORIES = [
  { id: 'self-help', name: 'Self Help', color: '#8b5cf6' },
  { id: 'finance', name: 'Finance', color: '#10b981' },
  { id: 'tutorial', name: 'Tutorial', color: '#3b82f6' },
  { id: 'videos', name: 'Videos', color: '#ef4444' },
  { id: 'trips', name: 'Trips', color: '#f59e0b' },
  { id: 'work', name: 'Work', color: '#6366f1' },
  { id: 'personal', name: 'Personal', color: '#ec4899' }
];

// Priority options
export const PRIORITIES = [
  { id: 'low', name: 'Low', color: '#10b981' },
  { id: 'medium', name: 'Medium', color: '#f59e0b' },
  { id: 'high', name: 'High', color: '#ef4444' }
];

// Get category by ID
export const getCategoryById = (id) => CATEGORIES.find(cat => cat.id === id) || { name: 'Uncategorized', color: '#94a3b8' };

// Get priority by ID
export const getPriorityById = (id) => PRIORITIES.find(p => p.id === id) || { name: 'Medium', color: '#f59e0b' };

// Calculate link usage by category
export const getLinksByCategory = (links) => {
  const categoryCounts = {};
  
  CATEGORIES.forEach(category => {
    categoryCounts[category.id] = 0;
  });
  
  links.forEach(link => {
    if (link.categoryId in categoryCounts) {
      categoryCounts[link.categoryId]++;
    }
  });
  
  return {
    categories: CATEGORIES.map(cat => cat.name),
    counts: CATEGORIES.map(cat => categoryCounts[cat.id]),
    colors: CATEGORIES.map(cat => cat.color)
  };
};

// Calculate task completion status
export const getTaskCompletionStatus = (tasks) => {
  const completed = tasks.filter(task => task.isCompleted).length;
  const overdue = tasks.filter(task => !task.isCompleted && isAfter(new Date(), parseISO(task.dueDate))).length;
  const pending = tasks.filter(task => !task.isCompleted && !isAfter(new Date(), parseISO(task.dueDate))).length;
  
  return {
    labels: ['Completed', 'Overdue', 'Pending'],
    data: [completed, overdue, pending],
    colors: ['#10b981', '#ef4444', '#f59e0b']
  };
};

// Calculate task completion by category
export const getTaskCompletionByCategory = (tasks) => {
  const categoryData = {};
  
  CATEGORIES.forEach(category => {
    categoryData[category.id] = {
      completed: 0,
      total: 0,
      name: category.name,
      color: category.color
    };
  });
  
  tasks.forEach(task => {
    if (task.categoryId in categoryData) {
      categoryData[task.categoryId].total++;
      if (task.isCompleted) {
        categoryData[task.categoryId].completed++;
      }
    }
  });
  
  // Calculate completion percentage for each category
  const series = Object.values(categoryData)
    .filter(cat => cat.total > 0)
    .map(cat => ({
      name: cat.name,
      data: [Math.round((cat.completed / cat.total) * 100)],
      color: cat.color
    }));
  
  return series;
};

// Calculate task distribution by priority
export const getTasksByPriority = (tasks) => {
  const priorityCounts = {};
  
  PRIORITIES.forEach(priority => {
    priorityCounts[priority.id] = 0;
  });
  
  tasks.forEach(task => {
    if (task.priority in priorityCounts) {
      priorityCounts[task.priority]++;
    }
  });
  
  return {
    labels: PRIORITIES.map(p => p.name),
    data: PRIORITIES.map(p => priorityCounts[p.id]),
    colors: PRIORITIES.map(p => p.color)
  };
};

// Generate time-based analytics for past 14 days
export const getTimeAnalytics = (tasks, links) => {
  const today = new Date();
  const days = 14; // Past 14 days
  
  const dateLabels = [];
  const taskCompletionData = Array(days).fill(0);
  const linkCreationData = Array(days).fill(0);
  
  // Create date labels
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    dateLabels.push(format(date, 'MMM d'));
    
    // Count tasks completed on this date
    tasks.forEach(task => {
      if (task.isCompleted && isSameDay(parseISO(task.completedAt || task.createdAt), date)) {
        taskCompletionData[days - 1 - i]++;
      }
    });
    
    // Count links created on this date
    links.forEach(link => {
      if (isSameDay(parseISO(link.createdAt), date)) {
        linkCreationData[days - 1 - i]++;
      }
    });
  }
  
  // In case we don't have completedAt, we'll add mock data
  if (taskCompletionData.every(val => val === 0)) {
    taskCompletionData[taskCompletionData.length - 1] = 2;
    taskCompletionData[taskCompletionData.length - 2] = 1;
    taskCompletionData[taskCompletionData.length - 4] = 3;
    taskCompletionData[taskCompletionData.length - 6] = 2;
    taskCompletionData[taskCompletionData.length - 9] = 1;
  }
  
  // In case we have empty link data, add some mock data
  if (linkCreationData.every(val => val === 0)) {
    linkCreationData[linkCreationData.length - 1] = 1;
    linkCreationData[linkCreationData.length - 3] = 2;
    linkCreationData[linkCreationData.length - 5] = 1;
    linkCreationData[linkCreationData.length - 8] = 2;
    linkCreationData[linkCreationData.length - 10] = 1;
  }
  
  return {
    labels: dateLabels,
    taskSeries: taskCompletionData,
    linkSeries: linkCreationData
  };
};

// Process tasks for "time to completion" metrics
export const getTaskCompletionTime = (tasks) => {
  // For completed tasks, calculate average days to completion
  const completedTasks = tasks.filter(task => task.isCompleted);
  
  // Dummy completion time data if no tasks have been completed
  if (completedTasks.length === 0) {
    return {
      averageDays: 3.2,
      quickestCategory: 'work',
      slowestCategory: 'personal'
    };
  }
  
  // Calculate actual completion time (we're adding mock completedAt since the model doesn't have it)
  const completionTimes = completedTasks.map(task => {
    // Mock the completedAt date (normally this would be stored in the task)
    const createdDate = parseISO(task.createdAt);
    const completedDate = parseISO(task.completedAt || new Date(createdDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString());
    
    return {
      categoryId: task.categoryId,
      daysToComplete: differenceInDays(completedDate, createdDate) || 1
    };
  });
  
  // Calculate average completion time
  const totalDays = completionTimes.reduce((sum, task) => sum + task.daysToComplete, 0);
  const averageDays = totalDays / completionTimes.length;
  
  // Calculate average by category
  const categoryCompletionTimes = {};
  
  completionTimes.forEach(task => {
    if (!categoryCompletionTimes[task.categoryId]) {
      categoryCompletionTimes[task.categoryId] = {
        total: 0,
        count: 0
      };
    }
    
    categoryCompletionTimes[task.categoryId].total += task.daysToComplete;
    categoryCompletionTimes[task.categoryId].count++;
  });
  
  // Calculate average for each category
  const categoryAverages = {};
  
  for (const categoryId in categoryCompletionTimes) {
    const { total, count } = categoryCompletionTimes[categoryId];
    categoryAverages[categoryId] = total / count;
  }
  
  // Find quickest and slowest categories
  let quickestCategory = null;
  let slowestCategory = null;
  let quickestTime = Infinity;
  let slowestTime = -1;
  
  for (const categoryId in categoryAverages) {
    const average = categoryAverages[categoryId];
    
    if (average < quickestTime) {
      quickestTime = average;
      quickestCategory = categoryId;
    }
    
    if (average > slowestTime) {
      slowestTime = average;
      slowestCategory = categoryId;
    }
  }
  
  return {
    averageDays: parseFloat(averageDays.toFixed(1)),
    quickestCategory,
    slowestCategory
  };
};

// Calculate current streak of completing tasks
export const calculateCurrentStreak = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;
  
  // Sort completed tasks by completion date (descending)
  const completedTasks = tasks
    .filter(task => task.isCompleted && task.completedAt)
    .sort((a, b) => compareAsc(parseISO(b.completedAt), parseISO(a.completedAt)));
  
  if (completedTasks.length === 0) return 0;
  
  const today = new Date();
  let currentStreak = 0;
  let currentDate = today;
  
  // Check if there's a completed task today
  const hasCompletedTaskToday = completedTasks.some(task => 
    isSameDay(parseISO(task.completedAt), today)
  );
  
  if (!hasCompletedTaskToday) {
    // Check if there's a completed task yesterday to continue the streak
    const yesterday = subDays(today, 1);
    const hasCompletedTaskYesterday = completedTasks.some(task =>
      isSameDay(parseISO(task.completedAt), yesterday)
    );
    
    if (!hasCompletedTaskYesterday) {
      // No task completed yesterday or today, streak is broken
      return 0;
    }
    
    // Start counting from yesterday
    currentDate = yesterday;
  }
  
  // Count the streak by walking backwards through days
  for (let i = 0; i <= 365; i++) { // Limit to 365 days to avoid infinite loop
    const day = i === 0 ? currentDate : subDays(currentDate, i);
    const hasCompletedTask = completedTasks.some(task =>
      isSameDay(parseISO(task.completedAt), day)
    );
    
    if (hasCompletedTask) {
      currentStreak++;
    } else {
      break; // Streak is broken
    }
  }
  
  return currentStreak;
};

// Calculate longest streak of completing tasks
export const calculateLongestStreak = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;
  
  // Sort completed tasks by completion date
  const completedTasks = tasks
    .filter(task => task.isCompleted && task.completedAt)
    .sort((a, b) => compareAsc(parseISO(a.completedAt), parseISO(b.completedAt)));
  
  if (completedTasks.length === 0) return 0;
  
  // Group tasks by date
  const tasksByDate = {};
  completedTasks.forEach(task => {
    const date = format(parseISO(task.completedAt), 'yyyy-MM-dd');
    if (!tasksByDate[date]) {
      tasksByDate[date] = [];
    }
    tasksByDate[date].push(task);
  });
  
  // Get sorted dates
  const dates = Object.keys(tasksByDate).sort();
  
  if (dates.length === 0) return 0;
  
  let currentStreak = 1;
  let longestStreak = 1;
  
  for (let i = 1; i < dates.length; i++) {
    const currentDate = parseISO(dates[i]);
    const prevDate = parseISO(dates[i - 1]);
    
    // Check if dates are consecutive
    if (differenceInDays(currentDate, prevDate) === 1) {
      currentStreak++;
    } else {
      currentStreak = 1; // Reset streak
    }
    
    // Update longest streak if current streak is longer
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }
  }
  
  return longestStreak;
};

// Generate streak data for visualization
export const getStreakData = (tasks) => {
  if (!tasks || tasks.length === 0) {
    // Return mock data if no tasks
    return {
      activeDays: 18,
      totalStreaks: 8,
      averageStreakLength: 5,
      longestStreakDate: 'Sep 15 - Oct 02',
      mostProductiveDay: 'Wednesday',
      heatmapSeries: [
        { name: "Mon", data: [0, 2, 1, 0, 3] },
        { name: "Tue", data: [1, 0, 2, 4, 0] },
        { name: "Wed", data: [3, 1, 0, 2, 1] },
        { name: "Thu", data: [0, 2, 3, 0, 2] },
        { name: "Fri", data: [2, 0, 1, 3, 0] },
        { name: "Sat", data: [1, 3, 0, 1, 4] },
        { name: "Sun", data: [0, 1, 2, 0, 1] }
      ]
    };
  }
  
  // Filter completed tasks
  const completedTasks = tasks.filter(task => task.isCompleted && task.completedAt);
  
  // Group tasks by date
  const tasksByDate = {};
  completedTasks.forEach(task => {
    const date = format(parseISO(task.completedAt), 'yyyy-MM-dd');
    if (!tasksByDate[date]) {
      tasksByDate[date] = [];
    }
    tasksByDate[date].push(task);
  });
  
  // Count active days
  const activeDays = Object.keys(tasksByDate).length;
  
  // Calculate streaks
  const dates = Object.keys(tasksByDate).sort().map(d => parseISO(d));
  
  if (dates.length === 0) {
    return {
      activeDays: 0,
      totalStreaks: 0,
      averageStreakLength: 0,
      longestStreakDate: 'N/A',
      mostProductiveDay: 'N/A',
      heatmapSeries: [
        { name: "Mon", data: [0, 0, 0, 0, 0] },
        { name: "Tue", data: [0, 0, 0, 0, 0] },
        { name: "Wed", data: [0, 0, 0, 0, 0] },
        { name: "Thu", data: [0, 0, 0, 0, 0] },
        { name: "Fri", data: [0, 0, 0, 0, 0] },
        { name: "Sat", data: [0, 0, 0, 0, 0] },
        { name: "Sun", data: [0, 0, 0, 0, 0] }
      ]
    };
  }
  
  // Find streaks
  let streaks = [];
  let currentStreak = [dates[0]];
  
  for (let i = 1; i < dates.length; i++) {
    const currentDate = dates[i];
    const prevDate = dates[i - 1];
    
    if (differenceInDays(currentDate, prevDate) === 1) {
      currentStreak.push(currentDate);
    } else {
      streaks.push([...currentStreak]);
      currentStreak = [currentDate];
    }
  }
  
  // Add the last streak
  if (currentStreak.length > 0) {
    streaks.push(currentStreak);
  }
  
  // Calculate longest streak
  const longestStreak = streaks.reduce((longest, current) => 
    current.length > longest.length ? current : longest, []);
  
  // Format longest streak date range
  let longestStreakDate = 'N/A';
  if (longestStreak.length > 0) {
    const start = format(longestStreak[0], 'MMM dd');
    const end = format(longestStreak[longestStreak.length - 1], 'MMM dd');
    longestStreakDate = `${start} - ${end}`;
  }
  
  // Calculate average streak length
  const totalStreakLength = streaks.reduce((sum, streak) => sum + streak.length, 0);
  const averageStreakLength = parseFloat((totalStreakLength / streaks.length).toFixed(1));
  
  // Find most productive day of the week
  const dayOfWeekCounts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}; // Sunday to Saturday
  
  Object.keys(tasksByDate).forEach(dateStr => {
    const date = parseISO(dateStr);
    const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
    dayOfWeekCounts[dayOfWeek] += tasksByDate[dateStr].length;
  });
  
  const mostProductiveDayNum = Object.keys(dayOfWeekCounts)
    .reduce((a, b) => dayOfWeekCounts[a] > dayOfWeekCounts[b] ? a : b);
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mostProductiveDay = days[mostProductiveDayNum];
  
  // Generate heatmap data (simplified)
  // In a real application, you'd generate this based on actual data
  // For this demo, we'll create some sample data
  const heatmapSeries = [
    { name: "Mon", data: [0, 2, 1, 0, 3] },
    { name: "Tue", data: [1, 0, 2, 4, 0] },
    { name: "Wed", data: [3, 1, 0, 2, 1] },
    { name: "Thu", data: [0, 2, 3, 0, 2] },
    { name: "Fri", data: [2, 0, 1, 3, 0] },
    { name: "Sat", data: [1, 3, 0, 1, 4] },
    { name: "Sun", data: [0, 1, 2, 0, 1] }
  ];
  
  return {
    activeDays,
    totalStreaks: streaks.length,
    averageStreakLength,
    longestStreakDate,
    mostProductiveDay,
    heatmapSeries
  };
};