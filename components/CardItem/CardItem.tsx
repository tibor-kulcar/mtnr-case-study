import React, { memo } from 'react';

import { ItemNew, NormalizedAvgParams } from '@/types';
import styles from './CardItem.module.css';

type CardItemProps = {
  item: ItemNew;
};

const CardItem = ({ item }: CardItemProps) => {
  const { percent, percent_avg_diff } = item;

  return (
    <div className={styles.cardItem}>
      <div
        className={`
          ${styles.cardItemValue}
          ${
            percent_avg_diff === NormalizedAvgParams.ABOVE &&
            styles.pillValueGreen
          }
          ${
            percent_avg_diff === NormalizedAvgParams.BELOW &&
            styles.pillValueRed
          }
        `}
      >
        {`${percent}%`}
      </div>
      <div className={styles.cardItemLabel}>{item.label}</div>
    </div>
  );
};

export default memo(CardItem);
