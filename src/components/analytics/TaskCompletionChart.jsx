import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { getTaskCompletionStatus, getTasksByPriority, getTaskCompletionTime } from '../../utils/analyticsUtils';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const TaskCompletionChart = ({ tasks }) => {
  const [completionData, setCompletionData] = useState({
    series: [0, 0, 0],
    options: {
      chart: {
        type: 'pie',
        fontFamily: 'inherit',
        foreColor: '#64748b',
        toolbar: {
          show: false
        }
      },
      labels: ['Completed', 'Overdue', 'Pending'],
      colors: ['#10b981', '#ef4444', '#f59e0b'],
      legend: {
        position: 'bottom',
        fontFamily: 'inherit'
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        shared: true,
        theme: 'dark',
        y: {
          formatter: function(val) {
            return `${val} task(s)`;
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  });
  
  const [priorityData, setPriorityData] = useState({
    series: [0, 0, 0],
    options: {
      chart: {
        type: 'bar',
        fontFamily: 'inherit',
        foreColor: '#64748b',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 5,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Low', 'Medium', 'High'],
      },
      yaxis: {
        title: {
          text: 'Tasks'
        },
      },
      colors: ['#10b981', '#f59e0b', '#ef4444'],
      legend: {
        show: false
      },
      tooltip: {
        shared: true,
        theme: 'dark',
        y: {
          formatter: function(val) {
            return `${val} task(s)`;
          }
        }
      }
    }
  });
  
  const [timeMetrics, setTimeMetrics] = useState({
    averageDays: 0,
    quickestCategory: '',
    slowestCategory: ''
  });

  useEffect(() => {
    // Task completion status chart data
    const completionStatus = getTaskCompletionStatus(tasks);
    setCompletionData(prev => ({
      ...prev,
      series: completionStatus.data,
      options: {
        ...prev.options,
        labels: completionStatus.labels,
        colors: completionStatus.colors
      }
    }));
    
    // Task by priority chart data
    const priorityStatus = getTasksByPriority(tasks);
    setPriorityData(prev => ({
      series: [{
        name: 'Tasks',
        data: priorityStatus.data
      }],
      options: {
        ...prev.options,
        xaxis: {
          categories: priorityStatus.labels
        },
        colors: priorityStatus.colors
      }
    }));
    
    // Task completion time metrics
    const timeData = getTaskCompletionTime(tasks);
    setTimeMetrics(timeData);
    
  }, [tasks]);
  
  // Calculate completion rate percentage
  const completionRate = tasks.length > 0 
    ? Math.round((completionData.series[0] / tasks.length) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card p-6 h-full"
    >
      <h3 className="text-lg font-semibold mb-4">Task Completion Analytics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold">{completionRate}%</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">Completion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold flex items-center justify-center">
            <span>{timeMetrics.averageDays}</span>
            <span className="text-xl ml-1">days</span>
          </div>
          <div className="text-sm text-surface-500 dark:text-surface-400">Avg. Completion Time</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{tasks.length}</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">Total Tasks</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <h4 className="text-sm font-medium mb-2 text-center">Completion Status</h4>
          <div className="h-48">
            <Chart 
              options={completionData.options} 
              series={completionData.series} 
              type="pie" 
              height="100%" 
            />
          </div>
        </div>
        
        <div className="w-full">
          <h4 className="text-sm font-medium mb-2 text-center">Tasks by Priority</h4>
          <div className="h-48">
            <Chart 
              options={priorityData.options} 
              series={priorityData.series} 
              type="bar" 
              height="100%" 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCompletionChart;