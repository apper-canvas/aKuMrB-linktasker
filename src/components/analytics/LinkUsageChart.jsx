import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { getLinksByCategory } from '../../utils/analyticsUtils';

const LinkUsageChart = ({ links }) => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0, 0, 0, 0, 0],
    options: {
      chart: {
        type: 'donut',
        fontFamily: 'inherit',
        foreColor: '#64748b',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%'
          }
        }
      },
      labels: ['Self Help', 'Finance', 'Tutorial', 'Videos', 'Trips', 'Work', 'Personal'],
      colors: ['#8b5cf6', '#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#6366f1', '#ec4899'],
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
            return `${val} link(s)`;
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

  useEffect(() => {
    const data = getLinksByCategory(links);
    
    setChartData(prev => ({
      ...prev,
      series: data.counts,
      options: {
        ...prev.options,
        labels: data.categories,
        colors: data.colors
      }
    }));
  }, [links]);
  
  // Find most used category
  const mostUsedIndex = chartData.series.indexOf(Math.max(...chartData.series));
  const mostUsedCategory = mostUsedIndex !== -1 ? chartData.options.labels[mostUsedIndex] : 'None';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-6 h-full"
    >
      <h3 className="text-lg font-semibold mb-4">Link Usage by Category</h3>
      
      <div className="mb-4">
        <div className="flex flex-col md:flex-row gap-4 justify-around mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{links.length}</div>
            <div className="text-sm text-surface-500 dark:text-surface-400">Total Links</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{mostUsedCategory}</div>
            <div className="text-sm text-surface-500 dark:text-surface-400">Most Used Category</div>
          </div>
        </div>
      </div>
      
      <div className="w-full h-64">
        <Chart 
          options={chartData.options} 
          series={chartData.series} 
          type="donut" 
          height="100%" 
        />
      </div>
    </motion.div>
  );
};

export default LinkUsageChart;