import React from 'react'
import useCryptoData from './UseCryptoData'

const Assets = () => {
    const { data, loading, error } = useCryptoData()
    
    if (loading) return <div className='text-center text-gray-500 p-4'> loading......</div>
    if (error) return <div className='text-red-500 p-4'> Error: {error.message}</div>
    
    return (
        <div className='mt-4 md:mt-20 px-4 lg:ml-10 md:pr-4'>
            <div className='flex flex-col lg:flex-row gap-6 '>
                {/* Main Content */}
                <div className='w-full '>
                    {/* Header Section */}
                    <div className='inline-flex bg-gray-200 rounded-xl p-1 px-2 flex-wrap dark:bg-gray-900 dark:text-gray-100 '>
                        <h1 className='bg-gray-500 rounded-2xl px-2 text-white text-sm md:text-base'>
                            <i className="fa-solid fa-star mr-1"></i>3 assets
                        </h1>
                        <h1 className='ml-3 text-sm md:text-base'>Recommended coin for 24h</h1>
                    </div>
                    
                    {/* Title Section */}
                    <div className='mt-4'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between p-1 px-2 gap-3'>
                            <h1 className='px-2 text-2xl md:text-3xl lg:text-4xl font-semibold'>
                                The Top 4 Stars of The Market
                            </h1>
                            <h1 className='border px-3 py-1 rounded-xl text-center text-sm md:text-base w-fit'>
                                24h
                            </h1>
                        </div>
                    </div>
                    
                    {/* Crypto Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 ">
                        {data?.slice(0, 4).map((crypto) => (
                            <div key={crypto.id} className="border p-4 md:p-6 rounded-3xl bg-white dark:bg-gray-900 dark:divide-gray-600 shadow-sm hover:shadow-md transition-shadow ">
                                <div className="flex flex-col items-center">
                                    {/* Crypto Header */}
                                    <div className="flex items-center justify-center mb-4 w-full">
                                        <img
                                            src={crypto.image}
                                            alt={`${crypto.name} logo`}
                                            className="w-8 h-8 md:w-10 md:h-10 mr-2 flex-shrink-0"
                                        />
                                        <div className="flex flex-row items-center text-center min-w-0">
                                            <span className="font-semibold text-lg md:text-xl lg:text-2xl truncate">
                                                {crypto.name}
                                            </span>
                                            <span className="text-gray-500 text-sm md:text-base">
                                                ({crypto.symbol.toUpperCase()})
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className='mb-3'>
                                        <span className="font-semibold text-lg md:text-xl">
                                            ${parseFloat(crypto.current_price).toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    {/* Percentage Change */}
                                    <div className="text-center">
                                        <div className="mb-2">
                                            <span className={`px-2 py-1 rounded text-sm md:text-base ${
                                                crypto.ath_change_percentage < 0 
                                                    ? 'text-red-600 bg-red-100 border border-red-200' 
                                                    : 'text-green-600 bg-green-100 border border-green-200'
                                            }`}>
                                                {crypto.ath_change_percentage.toFixed(2)}%
                                            </span>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600 text-center">
                                            gain for {crypto.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className='w-full lg:w-auto lg:flex-1 text-center'>
                    <div className="border p-4 md:p-6 lg:p-8 rounded-3xl bg-white dark:bg-gray-900 dark:divide-gray-600 shadow-sm lg:h-full">
                        {/* Wallet Header */}
                        <div className="flex items-center justify-center mb-4">
                            <i className="border p-2 fa-solid fa-wallet mr-3 rounded"></i>
                            <h1 className='text-xl md:text-2xl lg:text-3xlfont-semibold'>My Balance</h1>
                        </div>
                        
                        {/* Balance Amount */}
                        <h1 className='text-2xl md:text-3xl font-semibold mb-4 text-green-600'>
                            $9,405,788
                        </h1>
                        
                        {/* Balance Details */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 mb-6">
                            <div className='flex flex-col'>
                                <span className="text-gray-600 text-sm md:text-base">My Balance</span>
                                <span className='text-lg md:text-xl font-semibold'>5,999,103</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className="text-gray-600 text-sm md:text-base">Avg. gross</span>
                                <span className='text-lg md:text-xl font-semibold'>5,999,103</span>
                            </div>
                        </div>
                        
                        {/* Top Up Button */}
                        <div>
                            <button className='w-full bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl text-center transition-colors font-medium'>
                                Top Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assets