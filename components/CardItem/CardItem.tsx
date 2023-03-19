import React, { memo } from 'react';

import { ItemNew, NormalizedAvgParams } from '@/types';
import styles from './CardItem.module.css';

type CardItemProps = {
  item: ItemNew;
};

const CardItem = ({ item }: CardItemProps) => {
  const { percent, percent_avg_diff } = item;

  return (
    <div className={styles.cardItem} aria-label="Card item">
      <div
        className={`
          ${styles.cardItemValue}
          ${
            percent_avg_diff === NormalizedAvgParams.ABOVE
              ? styles.cardItemValueGreen
              : ''
          }
          ${
            percent_avg_diff === NormalizedAvgParams.BELOW
              ? styles.cardItemValueRed
              : ''
          }
        `}
      >
        {`${percent}%`}
      </div>
      <h4 className={styles.cardItemLabel}>{item.label}</h4>
    </div>
  );
};

export default memo(CardItem);
