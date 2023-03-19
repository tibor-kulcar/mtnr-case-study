import React, { useState } from 'react';
import { mdiAccountGroup, mdiTrendingDown, mdiTrendingUp } from '@mdi/js';

import { FilterParams } from '@/types';
import { Button } from '@/components/Button';
import styles from './Filter.module.css';

const filterItems = [
  {
    title: 'Vše',
    filter: FilterParams.ALL,
    icon: mdiAccountGroup,
  },
  {
    title: 'Nadprůměr',
    filter: FilterParams.ABOVE,
    icon: mdiTrendingUp,
  },
  {
    title: 'Podprůměr',
    filter: FilterParams.BELOW,
    icon: mdiTrendingDown,
  },
];

type FilterProps = {
  onFilter: (filter: FilterParams) => void;
};

const Filter = ({ onFilter }: FilterProps) => {
  const [active, setActive] = useState(FilterParams.ALL);

  const handleClick = (clickedFilter: FilterParams) => {
    if (clickedFilter === active) return;
    onFilter(clickedFilter);
    setActive(clickedFilter);
  };

  return (
    <div className={styles.filter}>
      {filterItems.map(({ title, filter, icon }, idx) => (
        <Button
          onClick={() => handleClick(filter)}
          label={title}
          icon={icon}
          active={active === filter}
          key={idx}
          aria-label={filter}
        />
      ))}
    </div>
  );
};

export default Filter;
