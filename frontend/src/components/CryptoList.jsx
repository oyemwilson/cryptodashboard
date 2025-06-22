import React from 'react';
import useCryptoData from './UseCryptoData';
import SparklineChart from './SparklineChart';

const CryptoList = () => {
  const { data, loading, error } = useCryptoData();

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4 mx-auto max-w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 overflow-hidden  rounded-3xl border border-gray-200">
        <thead>
          <tr>
            <th className="text-left px-4 py-3 dark:bg-gray-900 dark:divide-gray-600 bg-gray-50 border-b border-gray-200 rounded-tl-3xl sm:px-6 sm:py-5">Name</th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-900 dark:divide-gray-600 border-b border-gray-200 sm:px-6 sm:py-5">Symbol</th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-900 dark:divide-gray-600 border-b border-gray-200 sm:px-6 sm:py-5">Price (USD)</th>
            <th className="hidden sm:table-cell dark:bg-gray-900 dark:divide-gray-600 px-4 py-3 bg-gray-50 border-b border-gray-200 sm:px-6 sm:py-5">Market Cap 24h (USD)</th>
            <th className="hidden sm:table-cell dark:bg-gray-900 dark:divide-gray-600 px-4 py-3 bg-gray-50 border-b border-gray-200 sm:px-6 sm:py-5">Market Cap (USD)</th>
            <th className="hidden sm:table-cell dark:bg-gray-900 dark:divide-gray-600 px-4 py-3 bg-gray-50 border-b border-gray-200 sm:px-6 sm:py-5">High 24h</th>
            <th className="hidden sm:table-cell dark:bg-gray-900 dark:divide-gray-600 px-4 py-3 bg-gray-50 border-b border-gray-200 sm:px-6 sm:py-5">Low 24h</th>
            <th className="hidden sm:table-cell dark:bg-gray-900 dark:divide-gray-600 px-4 py-3 bg-gray-50 border-b border-gray-200 sm:px-6 sm:py-5">Total Volume</th>
            <th className="px-4 py-3 bg-gray-50 dark:bg-gray-900 dark:divide-gray-600 border-b border-gray-200 rounded-tr-3xl sm:px-6 sm:py-5">Chart</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crypto, index) => (
            <tr key={crypto.id}>
              <td
                className={`px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                } ${index === data.length - 1 ? 'rounded-bl-3xl' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={crypto.image}
                    alt={`${crypto.name} logo`}
                    className="w-6 h-6"
                  />
                  <span>{crypto.name}</span>
                </div>
              </td>
              <td
                className={`px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                {crypto.symbol.toUpperCase()}
              </td>
              <td
                className={`px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                ${parseFloat(crypto.current_price).toLocaleString()}
              </td>
              <td
                className={`hidden sm:table-cell px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                ${parseFloat(crypto.market_cap_change_24h).toLocaleString()}
              </td>
              <td
                className={`hidden sm:table-cell px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                ${parseFloat(crypto.market_cap).toLocaleString()}
              </td>
              <td
                className={`hidden sm:table-cell px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                ${parseFloat(crypto.high_24h).toLocaleString()}
              </td>
              <td
                className={`hidden sm:table-cell px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                ${parseFloat(crypto.low_24h).toLocaleString()}
              </td>
              <td
                className={`hidden sm:table-cell px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                ${parseFloat(crypto.total_volume).toLocaleString()}
              </td>
              <td
                className={`w-24 sm:w-32 px-4 py-3 sm:px-6 sm:py-5 ${
                  index !== data.length - 1 ? 'border-b border-gray-200' : ''
                } ${index === data.length - 1 ? 'rounded-br-3xl' : ''}`}
              >
                <SparklineChart data={crypto.sparkline_in_7d.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(CryptoList);