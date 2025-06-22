import React from 'react';
import CryptoList from './components/CryptoList';
import CryptoChart from './components/CryptoChart';
import ThemeToggler from './components/Themetoggler';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidenav from './components/Sidenav';
import Portfolio from './components/Portfolio';
import Assets from './components/Assets';

const App = () => {
  return (
<ThemeProvider>
  <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 overscroll-y-none">

    {/* Sidenav - collapses to very narrow on mobile */}
    <div className="w-full md:w-0 lg:w-60 flex-shrink-0  transition-all duration-300 md:h-screen md:sticky md:top-0 z-10">
      <Sidenav />
    </div>

    {/* Main content takes remaining space */}
    <main className="flex-1 min-w-0 overflow-x-auto  relative z-0 ">
      <Assets />
      <div className="p-2 md:p-4 flex lg:ml-10 flex-col lg:flex-row  justify-between items-start gap-4 ">
        <div className="w-full lg:w-[70%]">
          <CryptoChart />
        </div>
        <div className="w-full lg:w-[30%] ">
          <Portfolio />
        </div>
      </div>
      <div className="p-2 md:p-4 w-full">
        <CryptoList />
      </div>
    </main>
  </div>
</ThemeProvider>
  );
};

export default App;