import React from 'react';
import { TrendType } from '../../utils/enums';
import { FaSortDown, FaSortUp, FaGripLines } from 'react-icons/fa';

interface CoinTrendTypeIconInterface {
  trend: TrendType;
}

const CoinTrendTypeIcon: React.FC<CoinTrendTypeIconInterface> = ({
  trend,
}: CoinTrendTypeIconInterface) => {
  if (trend === TrendType.POSITIVE) {
    return (
      <div>
        <FaSortUp className='m-auto mt-2 text-green-400' />
      </div>
    );
  } else if (trend === TrendType.NEGATIVE) {
    return (
      <div>
        <FaSortDown className='m-auto -mt-1 text-red-500' />
      </div>
    );
  } else {
    return (
      <div>
        <FaGripLines className='m-auto mt-2 text-black' />
      </div>
    );
  }
};

export default CoinTrendTypeIcon;
