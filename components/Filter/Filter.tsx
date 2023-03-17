import React, { useState } from 'react';
import styles from './Filter.module.css';
import { Button } from '@/components/Button';
import { mdiAccountGroup, mdiTrendingDown, mdiTrendingUp } from '@mdi/js';
import { FilterParams } from '@/types';

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

  const handleClick = (filter: FilterParams) => {
    onFilter(filter);
    setActive(filter);
  };

  return (
    <div className={styles.filter}>
      {filterItems.map((filterItem, idx) => (
        <Button
          onClick={() => handleClick(filterItem.filter)}
          label={filterItem.title}
          icon={filterItem.icon}
          active={active === filterItem.filter}
          key={idx}
        />
      ))}
    </div>
  );
};

export default Filter;
