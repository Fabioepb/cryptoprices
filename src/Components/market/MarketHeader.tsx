import React from 'react';
import { useQuery } from 'react-query';
import { formatCapitalizatonToText } from '../../utils/format';
import { checkPercentageTrend } from '../../utils/percentage';
import { getDefiMarketData, getMarketData } from '../../utils/requests';
import { Trend } from '../../utils/types';
import CoinTrendTypeIcon from './CoinTrendTypeIcon';
import MarketPercentageChange from './MarketPercentageChange';
import { Spinner } from '@chakra-ui/react';
import { MINUTE } from '../../utils/constants';

const MarketHeader: React.FC = () => {
  const { data: globalMarketData, isLoading: globalMarketLoading } = useQuery(
    ['marketdata'],
    () => getMarketData()
  );

  const { data: defiMarketData, isLoading: defiMarketLoading } = useQuery(
    ['defimarketdata'],
    () => getDefiMarketData(),
    {
      staleTime: MINUTE * 2,
      cacheTime: MINUTE * 2,
    }
  );

  const globalMarketTrendPattern: Trend = checkPercentageTrend(
    globalMarketData?.market_cap_change_percentage_24h_usd || 0
  );

  return (
    <div className='text-gray-700 dark:bg-indigo-background  body-font'>
      <div className='px-8 py-10 mx-auto lg:px-0 flex flex-col md:flex-row'>
        <div className='flex flex-col mb-4 sm:mb-12 text-left inline-block w-68 sm:w-96'>
          <h1 className='mb-2 text-3xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 w-min sm:text-4xl font-sans w-max pr-1'>
            Market View
          </h1>
          <span className=' text-base font-medium leading-relaxed text-gray-500 w-auto'>
            Live cryptocurrency prices and market overview.
          </span>
        </div>

        <div className='flex sm:flex-row sm:ml-auto ml-0 mb-0 text-left w-auto inline-block flex-col'>
          <div className='mx-2 p-5 bg-gradient-to-br from-blue-500  to-purple-600 shadow-lg rounded-lg flex flex-col md:w-60'>
            <span className='text-md text-gray-300 text-bold mb-2'>
              Market Cap
            </span>
            {globalMarketLoading ? (
              <Spinner size='sm' color='white' />
            ) : (
              <span className='text-2xl flex items-center text-white'>
                {formatCapitalizatonToText(
                  globalMarketData?.total_market_cap.usd || 0
                )}
                <div className='inline-flex items-center justify-center text-lg ml-1'>
                  <CoinTrendTypeIcon
                    trend={globalMarketTrendPattern.trendType}
                  />
                  <MarketPercentageChange
                    percent={globalMarketTrendPattern.change}
                  />
                </div>
              </span>
            )}
          </div>

          <div className='mx-2 mt-4 sm:mt-0 p-5 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg rounded-lg flex flex-col md:w-60'>
            <span className='text-md text-gray-300 text-bold mb-2'>
              Defi Market Cap
            </span>
            {defiMarketLoading ? (
              <Spinner size='sm' color='white' />
            ) : (
              <span className='text-2xl flex items-center text-white'>
                {formatCapitalizatonToText(
                  parseFloat(defiMarketData?.defi_market_cap || '0')
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;
