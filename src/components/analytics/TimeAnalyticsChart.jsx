import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { getTimeAnalytics } from '../../utils/analyticsUtils';

const TimeAnalyticsChart = ({ tasks, links }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Tasks Completed',
        data: Array(14).fill(0)
      },
      {
        name: 'Links Added',
        data: Array(14).fill(0)
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'inherit',
        foreColor: '#64748b',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#6366f1', '#f59e0b'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [3, 3],
        curve: 'smooth'
      },
      title: {
        text: 'Activity Over Time',
        align: 'left'
      },
      grid: {
        borderColor: '#e2e8f0',
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 5
      },
      xaxis: {
        categories: Array(14).fill(''),
        title: {
          text: 'Date'
        }
      },
      yaxis: [
        {
          title: {
            text: 'Tasks Completed',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Links Added',
          }
        }
      ],
      tooltip: {
        theme: 'dark',
        shared: true,
        intersect: false,
        y: {
          formatter: function (val) {
            return val;
          }
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        offsetX: 40
      }
    }
  });

  useEffect(() => {
    const timeData = getTimeAnalytics(tasks, links);
    
    setChartData(prev => ({
      series: [
        {
          name: 'Tasks Completed',
          data: timeData.taskSeries
        },
        {
          name: 'Links Added',
          data: timeData.linkSeries
        }
      ],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories: timeData.labels
        }
      }
    }));
  }, [tasks, links]);
  
  // Calculate summary stats
  const taskTotal = chartData.series[0].data.reduce((sum, val) => sum + val, 0);
  const linkTotal = chartData.series[1].data.reduce((sum, val) => sum + val, 0);
  const taskAvg = (taskTotal / 14).toFixed(1);
  const linkAvg = (linkTotal / 14).toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card p-6 h-full"
    >
      <h3 className="text-lg font-semibold mb-4">Activity Trends (Past 14 Days)</h3>
      
      <div className="flex flex-col md:flex-row gap-4 justify-around mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold">{taskTotal}</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">Tasks Completed</div>
          <div className="text-md text-surface-600 dark:text-surface-300">Avg: {taskAvg}/day</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{linkTotal}</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">Links Added</div>
          <div className="text-md text-surface-600 dark:text-surface-300">Avg: {linkAvg}/day</div>
        </div>
      </div>
      
      <div className="w-full h-64">
        <Chart 
          options={chartData.options} 
          series={chartData.series} 
          type="line" 
          height="100%" 
        />
      </div>
    </motion.div>
  );
};

export default TimeAnalyticsChart;