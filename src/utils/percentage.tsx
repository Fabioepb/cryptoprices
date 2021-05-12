import { TrendType } from './enums';
import { Trend } from './types';

const checkPercentageTrend = (percent: number) => {
  const isCoinTrending: boolean = percent > 10;
  let trendColor: string = 'black',
    coinTrendType: TrendType = TrendType.NEUTRAL;

  if (percent > 0) {
    trendColor = 'green.400';
    coinTrendType = TrendType.POSITIVE;
  } else if (percent < 0) {
    trendColor = 'red.500';
    coinTrendType = TrendType.NEGATIVE;
  }

  const coinTrend: Trend = {
    isTrending: isCoinTrending,
    change: percent,
    color: trendColor,
    trendType: coinTrendType,
  };

  return coinTrend;
};

const formatPercentage = (percent: number) => {
  const formatPercent = Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percent);
  return formatPercent;
};

export { checkPercentageTrend, formatPercentage };
