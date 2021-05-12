import React from 'react';
import { Text } from '@chakra-ui/react';
import { checkPercentageTrend, formatPercentage } from '../../utils/percentage';
import { Trend } from '../../utils/types';

const MarketPercentageChange = ({ percent }: { percent: number }) => {
  const formattedPercent = formatPercentage(percent / 100);
  const coinTrend: Trend = checkPercentageTrend(percent);
  return <Text color={coinTrend.color}>{formattedPercent} </Text>;
};

export default MarketPercentageChange;
