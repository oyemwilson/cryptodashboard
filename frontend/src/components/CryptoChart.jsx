import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useCryptoData from './UseCryptoData';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoChart = () => {
  const { data, loading, error } = useCryptoData();
  const [selectedCoin, setSelectedCoin] = useState('');

  useEffect(() => {
    if (data.length > 0 && !selectedCoin) {
      setSelectedCoin(data[0].id);
    }
  }, [data, selectedCoin]);

  const selectedCoinData = data.find((coin) => coin.id === selectedCoin);

  // Generate labels based on 168 hourly data points
  const labels = Array.from({ length: 168 }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (167 - i));
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
    });
  });

  const chartData = {
    labels,
    datasets: selectedCoinData
      ? [
          {
            label: `${selectedCoinData.name} Price (USD)`,
            data: selectedCoinData.sparkline_in_7d.price,
            borderColor: '#8884d8',
            backgroundColor: 'rgba(136, 132, 216, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ]
      : [],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: window.innerWidth < 640 ? 12 : 14, // Responsive font size
          },
        },
      },
      title: {
        display: true,
        text: 'Cryptocurrency Price History (Last 7 Days)',
        font: {
          size: window.innerWidth < 640 ? 16 : 20,
        },
      },
      tooltip: {
        bodyFont: {
          size: window.innerWidth < 640 ? 12 : 14,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: window.innerWidth < 640 ? 12 : 14,
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: window.innerWidth < 640 ? 4 : 6, 
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
          font: {
            size: window.innerWidth < 640 ? 12 : 14,
          },
        },
        ticks: {
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 mt-10 sm:mt-20 w-full max-w-7xl mx-auto border rounded-3xl shadow-lg bg-white dark:bg-gray-900 dark:divide-gray-600">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
        Cryptocurrency Price Chart
      </h2>

      {loading && <p className="text-gray-600 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error.message}</p>}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="mb-4 flex justify-end">
            <select
              id="coin-select"
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="p-2 sm:p-3 w-full sm:w-64 border rounded-lg text-sm sm:text-base bg-gray-50 dark:bg-gray-900 dark:divide-gray-600 focus:ring-2 focus:ring-blue-500"
            >
              {data.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} (${parseFloat(coin.current_price).toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {selectedCoinData?.sparkline_in_7d?.price?.length > 0 ? (
            <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <Line data={chartData} options={options} />
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No price data available for {selectedCoinData?.name || 'selected coin'}.
            </p>
          )}
        </>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-600 text-center">No data available.</p>
      )}
    </div>
  );
};

export default React.memo(CryptoChart);