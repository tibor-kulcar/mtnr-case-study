import React, { useState } from 'react';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import { CategoryNew } from '@/types';
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
      <h2 className={styles.cardTitle}>{label}</h2>
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
          />
        )}
      </div>
    </div>
  );
};

export default Card;
