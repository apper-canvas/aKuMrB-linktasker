import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { Trophy, Calendar, Award, Zap, Clock } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { 
  getTimeAnalytics, 
  getTaskCompletionStatus,
  calculateCurrentStreak,
  calculateLongestStreak,
  getStreakData
} from '../utils/analyticsUtils';

// Mock data for initial development
const mockTasks = [
  { id: 1, title: 'Finish project report', isCompleted: true, completedAt: '2023-10-01T15:30:00Z', createdAt: '2023-09-29T10:00:00Z', categoryId: 'work', priority: 'high', dueDate: '2023-10-02T23:59:59Z' },
  { id: 2, title: 'Buy groceries', isCompleted: true, completedAt: '2023-10-02T18:45:00Z', createdAt: '2023-10-01T09:30:00Z', categoryId: 'personal', priority: 'medium', dueDate: '2023-10-03T23:59:59Z' },
  { id: 3, title: 'Schedule dentist appointment', isCompleted: true, completedAt: '2023-10-03T14:15:00Z', createdAt: '2023-09-28T11:20:00Z', categoryId: 'personal', priority: 'medium', dueDate: '2023-10-05T23:59:59Z' },
  { id: 4, title: 'Review marketing plan', isCompleted: true, completedAt: '2023-10-04T16:30:00Z', createdAt: '2023-10-02T13:45:00Z', categoryId: 'work', priority: 'high', dueDate: '2023-10-06T23:59:59Z' },
  { id: 5, title: 'Call mom', isCompleted: true, completedAt: '2023-10-05T19:00:00Z', createdAt: '2023-10-04T08:30:00Z', categoryId: 'personal', priority: 'low', dueDate: '2023-10-06T23:59:59Z' },
  { id: 6, title: 'Research vacation destinations', isCompleted: false, createdAt: '2023-10-05T16:20:00Z', categoryId: 'trips', priority: 'low', dueDate: '2023-10-15T23:59:59Z' },
  { id: 7, title: 'Finish online course', isCompleted: false, createdAt: '2023-09-20T10:15:00Z', categoryId: 'self-help', priority: 'medium', dueDate: '2023-10-20T23:59:59Z' },
  { id: 8, title: 'Pay credit card bill', isCompleted: true, completedAt: '2023-10-07T11:30:00Z', createdAt: '2023-10-03T14:20:00Z', categoryId: 'finance', priority: 'high', dueDate: '2023-10-10T23:59:59Z' },
  { id: 9, title: 'Fix leaky faucet', isCompleted: true, completedAt: '2023-10-08T15:45:00Z', createdAt: '2023-10-06T09:10:00Z', categoryId: 'personal', priority: 'medium', dueDate: '2023-10-12T23:59:59Z' },
  { id: 10, title: 'Review quarterly goals', isCompleted: true, completedAt: '2023-10-08T16:30:00Z', createdAt: '2023-10-01T08:00:00Z', categoryId: 'work', priority: 'high', dueDate: '2023-10-09T23:59:59Z' }
];

const mockLinks = [
  { id: 1, title: 'JavaScript Best Practices', url: 'https://example.com/js-best-practices', categoryId: 'tutorial', createdAt: '2023-10-01T10:30:00Z' },
  { id: 2, title: 'Investment Strategies', url: 'https://example.com/investment', categoryId: 'finance', createdAt: '2023-10-03T14:15:00Z' },
  { id: 3, title: 'Vacation Ideas', url: 'https://example.com/vacations', categoryId: 'trips', createdAt: '2023-10-05T09:20:00Z' }
];

const Streak = () => {
  const [tasks, setTasks] = useState([]);
  const [links, setLinks] = useState([]);
  const [streakData, setStreakData] = useState(null);
  const [completionData, setCompletionData] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    // For now, we're using mock data
    setTasks(mockTasks);
    setLinks(mockLinks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const completionStatus = getTaskCompletionStatus(tasks);
      setCompletionData(completionStatus);
      
      // Calculate streak data
      const current = calculateCurrentStreak(tasks);
      const longest = calculateLongestStreak(tasks);
      setCurrentStreak(current);
      setLongestStreak(longest);
      
      // Generate data for streak visualization
      setStreakData(getStreakData(tasks));
    }
  }, [tasks]);

  const heatmapOptions = {
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false
      },
      fontFamily: 'inherit',
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#10b981"],
    xaxis: {
      type: 'category',
      labels: {
        show: true,
        style: {
          colors: '#94a3b8'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8'
        }
      }
    },
    title: {
      text: 'Task Completion Activity',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#64748b'
      }
    },
    theme: {
      mode: 'light'
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value + " tasks";
        }
      }
    },
    plotOptions: {
      heatmap: {
        radius: 3,
        enableShades: true,
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: '#e2e8f0',
              name: 'none'
            },
            {
              from: 1,
              to: 2,
              color: '#a7f3d0',
              name: 'low'
            },
            {
              from: 3,
              to: 4,
              color: '#34d399',
              name: 'medium'
            },
            {
              from: 5,
              to: 100,
              color: '#10b981',
              name: 'high'
            }
          ]
        }
      }
    }
  };

  const heatmapSeries = streakData ? streakData.heatmapSeries : [
    {
      name: "Mon",
      data: [0, 2, 1, 0, 3]
    },
    {
      name: "Tue",
      data: [1, 0, 2, 4, 0]
    },
    {
      name: "Wed",
      data: [3, 1, 0, 2, 1]
    },
    {
      name: "Thu",
      data: [0, 2, 3, 0, 2]
    },
    {
      name: "Fri",
      data: [2, 0, 1, 3, 0]
    },
    {
      name: "Sat",
      data: [1, 3, 0, 1, 4]
    },
    {
      name: "Sun",
      data: [0, 1, 2, 0, 1]
    }
  ];

  const pieOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      background: 'transparent'
    },
    labels: completionData ? completionData.labels : ['Completed', 'Overdue', 'Pending'],
    colors: completionData ? completionData.colors : ['#10b981', '#ef4444', '#f59e0b'],
    legend: {
      position: 'bottom',
      fontFamily: 'inherit',
      labels: {
        colors: '#64748b'
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true
            },
            value: {
              show: true,
              formatter: function(val) {
                return val;
              }
            },
            total: {
              show: true,
              formatter: function(w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <section className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Your Todo <span className="text-gradient">Streak</span> Journey
        </h1>
        <p className="text-surface-600 dark:text-surface-300 text-lg">
          Track your consistency and build habits by maintaining your daily todo completion streak.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 flex items-center">
          <div className="rounded-full bg-primary-50 dark:bg-primary-900/20 p-4 mr-4">
            <Zap className="h-8 w-8 text-primary-500" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Current Streak</p>
            <h3 className="text-3xl font-bold">{currentStreak} days</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 flex items-center">
          <div className="rounded-full bg-secondary-50 dark:bg-secondary-900/20 p-4 mr-4">
            <Trophy className="h-8 w-8 text-secondary-500" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Longest Streak</p>
            <h3 className="text-3xl font-bold">{longestStreak} days</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 flex items-center">
          <div className="rounded-full bg-green-50 dark:bg-green-900/20 p-4 mr-4">
            <Award className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Completion Rate</p>
            <h3 className="text-3xl font-bold">
              {completionData ? 
                `${Math.round((completionData.data[0] / completionData.data.reduce((acc, val) => acc + val, 0)) * 100)}%` 
                : '85%'}
            </h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 flex items-center">
          <div className="rounded-full bg-orange-50 dark:bg-orange-900/20 p-4 mr-4">
            <Calendar className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Active Days</p>
            <h3 className="text-3xl font-bold">
              {streakData ? streakData.activeDays : 18}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Activity Heatmap</h2>
          <div className="h-80">
            <Chart
              options={heatmapOptions}
              series={heatmapSeries}
              type="heatmap"
              height="100%"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-bold mb-4">Task Status</h2>
          <div className="h-80">
            <Chart
              options={pieOptions}
              series={completionData ? completionData.data : [8, 2, 4]}
              type="donut"
              height="100%"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Streak Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-surface-200 dark:border-surface-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary-500" />
              Streak History
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-300">Average streak length</span>
                <span className="font-medium">{streakData ? streakData.averageStreakLength : 5} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-300">Total streaks started</span>
                <span className="font-medium">{streakData ? streakData.totalStreaks : 8}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-300">Longest streak date</span>
                <span className="font-medium">{streakData ? streakData.longestStreakDate : 'Sep 15 - Oct 02'}</span>
              </div>
            </div>
          </div>
          
          <div className="border border-surface-200 dark:border-surface-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-secondary-500" />
              Streak Tips
            </h3>
            <ul className="space-y-3 text-surface-600 dark:text-surface-300">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Complete at least one task daily to maintain your streak
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Your most productive day is {streakData ? streakData.mostProductiveDay : 'Wednesday'}
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                Set a goal to beat your longest streak of {longestStreak} days
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Streak;