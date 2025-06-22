import React from 'react';
import useCryptoData from './UseCryptoData';

const Portfolio = () => {
    const { data, loading, error } = useCryptoData();

    if (loading) return <p className="text-center text-gray-500 p-4">Loading...</p>;
    if (error) return <p className="text-red-500 p-4">Error: {error.message}</p>;

    return (
        <div className="pl-3">
            <div className="border mt-4 md:mt-10 lg:mt-20 min-h-[300px] md:min-h-[400px] w-full rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 bg-white dark:bg-gray-900 dark:divide-gray-600 shadow-sm">
                
                {/* Header Section */}
                <div className="flex items-center justify-between mt-2 md:mt-3">
                    <div className="flex items-center gap-3">
                        <i className="border p-2 md:p-3 fa-solid fa-chart-simple rounded-lg bg-gray-50 dark:bg-gray-900 dark:divide-gray-600"></i>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">My Portfolio</h2>
                    </div>
                </div>
                
                {/* Total Assets */}
                <h3 className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 font-medium">
                    3 Total Assets
                </h3>
                
                {/* Progress Bars */}
                <div className="flex items-center gap-2 mt-3 md:mt-4">
                    <div className="bg-green-600 h-3 md:h-4 lg:h-5 flex-[6] rounded-full"></div>
                    <div className="bg-purple-600 h-3 md:h-4 lg:h-5 flex-[3] rounded-full"></div>
                    <div className="bg-gray-300 h-3 md:h-4 lg:h-5 flex-[1] rounded-full"></div>
                </div>

                {/* Crypto List */}
                <div className="mt-4 md:mt-5 lg:mt-6 space-y-3 md:space-y-4">
                    {data?.slice(0, 3).map((crypto, index) => (
                        <div key={crypto.id} className={`${index > 0 ? 'border-t border-gray-200 pt-3 md:pt-4' : ''}`}>
                            {/* Crypto Info Row */}
                            <div className="flex items-center justify-between gap-3">
                                {/* Left Side - Crypto Details */}
                                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                    <img
                                        src={crypto.image}
                                        alt={`${crypto.name} logo`}
                                        className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1 md:gap-2">
                                            <span className="font-medium text-sm md:text-base lg:text-lg truncate">
                                                {crypto.name}
                                            </span>
                                            <span className="text-gray-500 text-xs md:text-sm flex-shrink-0">
                                                ({crypto.symbol.toUpperCase()})
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Percentage */}
                                <div className="flex-shrink-0">
                                    <span className={`px-2 py-1 rounded text-xs md:text-sm font-medium ${
                                        crypto.ath_change_percentage < 0 
                                            ? 'text-red-600 bg-red-100 border border-red-200' 
                                            : 'text-green-600 bg-green-100 border border-green-200'
                                    }`}>
                                        {crypto.ath_change_percentage.toFixed(2)}%
                                    </span>
                                </div>
                            </div>

                            {/* Price Row */}
                            <div className="mt-2">
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">
                                    ${parseFloat(crypto.current_price).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Portfolio Summary (Optional Enhancement) */}
                <div className="mt-6 md:mt-8 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-xs md:text-sm text-gray-500">Total Value</p>
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900">
                                ${data?.slice(0, 3).reduce((sum, crypto) => sum + crypto.current_price, 0).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500">Assets</p>
                            <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900">3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;