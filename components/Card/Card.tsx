import React, { useState, memo } from 'react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

import { CategoryNew } from '@/types';
import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import styles from './Card.module.css';

type CardProps = {
  item: CategoryNew;
  limit?: number;
};

const Card = ({ item, limit = 10 }: CardProps) => {
  const { label, items } = item;
  const isMore = items.length > limit;
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{label}</h3>
      <div className={styles.cardContent}>
        {showMore
          ? items.map((item, itemIndex) => (
              <CardItem item={item} key={itemIndex} />
            ))
          : items
              .map((item, itemIndex) => (
                <CardItem item={item} key={itemIndex} />
              ))
              .slice(0, limit)}
        {isMore && (
          <Button
            onClick={handleClick}
            label={!showMore ? 'Zobrazit více' : 'Zobrazit méně'}
            icon={!showMore ? mdiChevronDown : mdiChevronUp}
            aria-expanded={showMore}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Card);
