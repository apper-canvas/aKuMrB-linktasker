import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { getTaskCompletionByCategory, getCategoryById } from '../../utils/analyticsUtils';

const CategoryPerformanceChart = ({ tasks }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        fontFamily: 'inherit',
        foreColor: '#64748b',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',
          borderRadius: 4
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: [''],
        labels: {
          formatter: function (val) {
            return val + "%";
          }
        }
      },
      yaxis: {
        title: {
          text: 'Categories'
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function(val) {
            return val + "% completed";
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  });

  useEffect(() => {
    const seriesData = getTaskCompletionByCategory(tasks);
    
    setChartData(prev => ({
      ...prev,
      series: seriesData
    }));
  }, [tasks]);
  
  // Find best and worst performing categories
  let bestCategory = { name: 'None', data: [0] };
  let worstCategory = { name: 'None', data: [100] };
  
  if (chartData.series.length > 0) {
    bestCategory = chartData.series.reduce((max, category) => 
      category.data[0] > max.data[0] ? category : max, 
      { name: 'None', data: [0] }
    );
    
    worstCategory = chartData.series.reduce((min, category) => 
      category.data[0] < min.data[0] ? category : min, 
      { name: 'None', data: [100] }
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card p-6 h-full"
    >
      <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
      
      <div className="flex flex-col md:flex-row gap-4 justify-around mb-6">
        <div className="text-center">
          <div className="text-xl font-bold">{bestCategory.name}</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">Best Performing Category</div>
          <div className="text-lg font-semibold text-green-500">{bestCategory.data[0]}% completed</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{worstCategory.name}</div>
          <div className="text-sm text-surface-500 dark:text-surface-400">Needs Improvement</div>
          <div className="text-lg font-semibold text-amber-500">{worstCategory.data[0]}% completed</div>
        </div>
      </div>
      
      <div className="w-full h-64">
        <Chart 
          options={chartData.options} 
          series={chartData.series} 
          type="bar" 
          height="100%" 
        />
      </div>
    </motion.div>
  );
};

export default CategoryPerformanceChart;