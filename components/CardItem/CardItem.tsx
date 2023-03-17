import React from 'react';
import styles from './CardItem.module.css';
import { ItemNew } from '@/types';

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
          ${percent_avg_diff === 'above' && styles.pillValueGreen}
          ${percent_avg_diff === 'below' && styles.pillValueRed}
        `}
      >
        {`${percent}%`}
      </div>
      <div className={styles.cardItemLabel}>{item.label}</div>
    </div>
  );
};

export default CardItem;
