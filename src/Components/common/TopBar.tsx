import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { SECOND } from '../../utils/constants';
import { formatUsdPrice } from '../../utils/format';
import { checkPercentageTrend, formatPercentage } from '../../utils/percentage';
import { getMarketData } from '../../utils/requests';
import { Trend } from '../../utils/types';
import MarketPercentageChange from '../market/MarketPercentageChange';

const TopBar: React.FC = () => {
  const { data, isLoading, isSuccess } = useQuery(
    ['marketdata'],
    () => getMarketData(),
    {
      staleTime: SECOND * 20,
      refetchInterval: SECOND * 20,
    }
  );

  // For Theme Switcher
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.removeItem('theme');
  }, []);

  const coinTrendPattern: Trend = checkPercentageTrend(
    data?.market_cap_change_percentage_24h_usd || 0
  );

  return (
    // NavBar Has Nothing Currently
    <nav className='bg-gradient-to-r to-purple-600 from-blue-800 dark:bg-indigo-background py-2'>
      <div className=' container mx-auto'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
          <div className='flex justify-between items-center'>
            {isSuccess && (
              <div className='overflow-x-auto whitespace-pre px-2 sm:px-0 sm:whitespace-normal '>
                <span className='text-white text-xs pr-3'>
                  Cryptocurrencies: {data?.active_cryptocurrencies}
                </span>
                <span className='text-white text-xs pr-3'>
                  Markets: {data?.markets}
                </span>
                <span className='text-white text-xs pr-3'>
                  Volume (24h): {formatUsdPrice(data?.total_volume.usd || 0, 2)}
                </span>
                <span className='text-white text-xs pr-3 inline-flex'>
                  Market cap:{' '}
                  {formatUsdPrice(data?.total_market_cap.usd || 0, 2)}
                  <div className='inline-flex items-center justify-center ml-1'>
                    (
                    <MarketPercentageChange percent={coinTrendPattern.change} />
                    )
                  </div>
                </span>
                <span className='text-white text-xs pr-3'>
                  Dominance:{' '}
                  {data?.market_cap_percentage &&
                    `BTC: ${formatPercentage(
                      data?.market_cap_percentage.btc / 100
                    )}  ETH: ${formatPercentage(
                      data?.market_cap_percentage.eth / 100
                    )} BNB: ${formatPercentage(
                      data?.market_cap_percentage.bnb / 100
                    )}`}
                </span>
              </div>
            )}
            {isLoading && (
              <span className='text-white font-xl'>Loading...</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
