import React from 'react';
import { Text, Spinner, Badge } from '@chakra-ui/react';
import MarketPercentageChange from './MarketPercentageChange';
import { useState } from 'react';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { checkPercentageTrend } from '../../utils/percentage';
import { Trend, Price } from '../../utils/types';
import CoinTrendTypeIcon from './CoinTrendTypeIcon';
import { formatNumber, formatUsdPrice } from '../../utils/format';
import { FaRegDizzy } from 'react-icons/fa';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

const headers = [
  'coin',
  'price',
  '24h change',
  '7d change',
  'market cap',
  'volume (24h)',
  'circulating supply',
];

const order_fields: Record<string, string> = {
  price: 'price',
  'market cap': 'market_cap',
  'volume (24h)': 'volume',
};

const getMarket = async (
  page = 1,
  order_by = 'market_cap',
  order_dir = 'desc'
) => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=${order_by}_${order_dir}&per_page=50&page=${page}&price_change_percentage=24h,7d`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Fetching Error');
  }
  return await response.json();
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('market', () => getMarket());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const MarketTable = () => {
  const [page, setPage] = useState(1);
  const [orderDirection, setOrderDirection] = useState('desc');
  const [orderField, setOrderField] = useState('market_cap');
  const nextPage = () => {
    setPage((old) => old + 1);
  };
  const previousPage = () => {
    setPage((old) => old - 1);
  };

  const { data, isError, isLoading, isSuccess } = useQuery(
    ['market', page, orderField, orderDirection],
    () => getMarket(page, orderField, orderDirection),
    {
      staleTime: 10000,
      refetchInterval: 10000,
    }
  );

  const handleHeaderClick = (field: string) => {
    if (order_fields[field]) {
      setOrderDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
      setOrderField(order_fields[field]);
    }
  };

  return (
    <div className='mx-auto px-2 sm:px-0 md:pb-20'>
      <div className='py-1'></div>
      <div className='overflow-x-auto shadow-xl rounded-2xl'>
        <div className='inline-block min-w-full  rounded-2xl overflow-hidden'>
          <table className='min-w-full leading-normal  '>
            <thead>
              <tr>
                <th className='px-3 text-center py-3 border-b-2 border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-indigo-dark text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider'>
                  #
                </th>
                {headers.map((header: string, i: number) => (
                  <th
                    key={`header-${i}`}
                    className='px-5 py-3 border-b-2 border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-indigo-dark text-left text-xs font-semibold text-gray-600 dark:text-gray-100 uppercase tracking-wider cursor-pointer'
                    onClick={() => handleHeaderClick(header)}
                  >
                    <div className='flex'>
                      {header}
                      {orderField === order_fields[header] && (
                        <div className='ml-1'>
                          {orderDirection === 'asc' ? (
                            <FaSortUp className='text-black dark:text-gray-600 mt-1' />
                          ) : (
                            <FaSortDown className='text-black dark:text-gray-600 ' />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isSuccess &&
                data?.map((price: Price, i: number) => {
                  const coinTrendPatternDay: Trend = checkPercentageTrend(
                    price.price_change_percentage_24h
                  );
                  const coinTrendPatternWeek: Trend = checkPercentageTrend(
                    price.price_change_percentage_7d_in_currency
                  );

                  return (
                    <tr style={{ height: 93 }} key={price.id + i}>
                      <td className='px-3 text-center py-5 border-b border-gray-200 font-bold bg-white dark:border-gray-700 dark:bg-indigo-dark text-sm'>
                        {price.market_cap_rank || '--'}
                      </td>
                      <td className='px-0 w-20 sm:px-3 sm:w-60 py-5 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-indigo-dark text-sm'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 w-7 h-7'>
                            <img
                              className='w-full h-full rounded-full'
                              src={price.image}
                            />
                          </div>
                          <div className='ml-3'>
                            <span className='font-bold text-gray-600 whitespace-no-wrap dark:text-gray-100 '>
                              {price.name}
                            </span>
                          </div>
                          <div>
                            <Badge rounded='md' ml={3}>
                              {price.symbol}
                            </Badge>
                          </div>
                          {coinTrendPatternDay.isTrending && (
                            <div>
                              <Badge rounded='md' ml={3}>
                                🔥
                              </Badge>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='px-2 py-5 border-b border-gray-200 bg-white dark:border-gray-700   dark:bg-indigo-dark text-sm'>
                        <span className='font-bold  text-gray-600 whitespace-no-wrap dark:text-gray-100 '>
                          {formatUsdPrice(
                            price.current_price,
                            price.current_price < 0.001 ? 10 : 3
                          )}
                        </span>
                      </td>
                      <td className=' font-bold  px-5 py-5 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-indigo-dark text-sm'>
                        <span className='flex items-center'>
                          <CoinTrendTypeIcon
                            trend={coinTrendPatternDay.trendType}
                          />
                          <MarketPercentageChange
                            percent={price.price_change_percentage_24h}
                          />
                        </span>
                      </td>
                      <td className=' font-bold  px-5 py-5 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-indigo-dark text-sm'>
                        <span className='flex items-center'>
                          <CoinTrendTypeIcon
                            trend={coinTrendPatternWeek.trendType}
                          />
                          <MarketPercentageChange
                            percent={
                              price.price_change_percentage_7d_in_currency
                            }
                          />
                        </span>
                      </td>

                      <td className='px-2 py-5 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-indigo-dark text-sm'>
                        <span className='font-bold  text-gray-600 whitespace-no-wrap dark:text-gray-100 '>
                          {price.market_cap
                            ? formatUsdPrice(price.market_cap, 0)
                            : '--'}
                        </span>
                      </td>
                      <td className='px-2 py-5 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-indigo-dark text-sm'>
                        <span className='font-bold  text-gray-600 whitespace-no-wrap dark:text-gray-100 '>
                          {price.total_volume
                            ? formatUsdPrice(price.total_volume, 0)
                            : '--'}
                        </span>
                      </td>
                      <td className='px-2 py-5 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-indigo-dark text-sm'>
                        <div className='w-auto inline-block'>
                          <span className='font-bold  text-gray-600 whitespace-no-wrap dark:text-gray-100 uppercase'>
                            {`${formatNumber(price.circulating_supply)} ${
                              price.symbol
                            }`}
                          </span>
                          {price.total_supply && (
                            <div className='flex flex-col'>
                              <div className='flex justify-apart'>
                                <span className='text-gray-500 text-xs mr-2'>
                                  Max Supply
                                </span>
                                <span className='text-gray-500 text-xs uppercase'>
                                  {`${formatNumber(price.total_supply, 0)} ${
                                    price.symbol
                                  }`}
                                </span>
                              </div>
                              <div className='flex justify-between'>
                                <span className='text-gray-500 text-xs mr-2'>
                                  Percentage
                                </span>
                                <span className='text-gray-500 text-xs uppercase'>
                                  {formatNumber(
                                    (price.circulating_supply /
                                      price.total_supply) *
                                      100,
                                    1
                                  )}
                                  %
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {isLoading && (
            <div className='container flex flex-col items-center justify-center h-1/2-screen text-center bg-white dark:bg-indigo-dark'>
              <Spinner color='blue.800' position='initial' size='xl' />
              <p className='mt-2'>Loading content...</p>
            </div>
          )}
          {isError && (
            <div className='container flex flex-col items-center justify-center h-1/2-screen text-center bg-white dark:bg-indigo-dark'>
              <FaRegDizzy size={64} className='text-red-400 mb-2' />
              <p className='mt-2 font-bold text-lg'>There was an error</p>
              <p className='mt-2 font-bold text-lg'>
                Please reload the website, if this keeps occurring please
                contact us at blockexplorer@help.com
              </p>
            </div>
          )}
          <div className='px-5 py-5 bg-white dark:bg-indigo-dark dark:border-gray-600 border-t flex flex-col xs:flex-row items-left md:items-center lg:items-center xs:justify-between'>
            <span className='text-xs xs:text-sm text-gray-700 dark:text-gray-200'>
              <Text className='font-bold'>Page {page}</Text>
            </span>
            <div className='inline-flex mt-2 xs:mt-0'>
              <button
                onClick={previousPage}
                disabled={page === 1 ? true : false}
                className='text-sm bg-gray-300 dark:text-gray-200 dark:bg-indigo-900  hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l'
              >
                Prev
              </button>
              <button
                onClick={nextPage}
                className='text-sm bg-gray-300 dark:text-gray-200 dark:bg-indigo-900  hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTable;
