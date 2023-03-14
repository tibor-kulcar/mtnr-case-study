import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import React, { useState } from 'react';

import data from '../public/demographics.json';

type DataItem = {
  label: string;
  percent: number;
  percent_avg: number;
};

interface ItemNew {
  label: string;
  percent: number;
  percent_avg_diff: 'below' | 'normal' | 'above';
}

interface Category {
  label: string;
  items: DataItem[];
}

interface CategoryNew {
  label: string;
  items: ItemNew[];
}

interface InputData {
  data: Category[];
}

interface OutputData {
  data: CategoryNew[];
}

const newData = (inputData: InputData): OutputData => {
  const outputData: OutputData = {
    data: [],
  };

  for (const category of inputData.data) {
    const roundedItems: ItemNew[] = category.items.map((item) => {
      const roundedPercent = Math.round(item.percent);
      const roundedPercentAvg = Math.round(item.percent_avg);
      const diff = roundedPercent - roundedPercentAvg;
      const percentAvgDiff =
        diff < -3 ? 'below' : diff > 3 ? 'above' : 'normal';

      return {
        label: item.label,
        percent: roundedPercent,
        percent_avg_diff: percentAvgDiff,
      };
    });

    outputData.data.push({
      label: category.label,
      items: roundedItems,
    });
  }

  return outputData;
};

type PillProps = {
  item: ItemNew;
};
const Pill = ({ item, ...rest }: PillProps) => {
  const { percent, percent_avg_diff } = item;
  return (
    <div {...rest} className={styles.pill}>
      <div
        className={`${styles.pillValue} ${
          percent_avg_diff === 'above'
            ? styles.pillValueGreen
            : percent_avg_diff === 'below'
            ? styles.pillValueRed
            : ''
        }`}
      >
        {percent} %
      </div>
      <div className={styles.pillLabel}>{item.label}</div>
    </div>
  );
};
type CardProps = {
  item: CategoryNew;
};

const Card = ({ item, ...rest }: CardProps) => {
  const { label, items } = item;
  const isMore = items.length > 10;
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={styles.card} {...rest}>
      <h2>{label}</h2>
      <div className={styles.cardContent}>
        {showMore
          ? items.map((item, itemIndex) => <Pill item={item} key={itemIndex} />)
          : items
              .map((item, itemIndex) => <Pill item={item} key={itemIndex} />)
              .slice(0, 10)}
      </div>
      {isMore && (
        <button onClick={handleClick} className={styles.pill}>
          <div className={styles.pillLabel}>
            {isMore ? 'Zobrazit více' : 'Zobrazit méně'}
          </div>
        </button>
      )}
    </div>
  );
};

export default function Home() {
  const demographics = newData(data);

  const [filteredData, setFilteredData] = useState(demographics.data);

  interface Item {
    label: string;
    percent: number;
    percent_avg_diff: 'above' | 'below' | 'normal';
  }

  interface Group {
    label: string;
    items: Item[];
  }

  function filterData(filterParam: 'above' | 'below' | 'all') {
    if (filterParam === 'all') {
      setFilteredData(demographics.data);
    } else {
      const filteredGroups: Group[] = [];
      for (const group of demographics.data) {
        const filteredItems = group.items.filter(
          (item) => item.percent_avg_diff === filterParam
        );
        if (filteredItems.length > 0) {
          filteredGroups.push({ ...group, items: filteredItems });
        }
      }

      setFilteredData(filteredGroups);
    }
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.description}>
          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
        </div>

        <div className={styles.filter}>
          <button onClick={() => filterData('all')} className={styles.pill}>
            <div className={styles.pillLabel}>Vše</div>
          </button>
          <button onClick={() => filterData('above')} className={styles.pill}>
            <div className={styles.pillLabel}>Nadprůměr</div>
          </button>
          <button onClick={() => filterData('below')} className={styles.pill}>
            <div className={styles.pillLabel}>Podprůměr</div>
          </button>
        </div>

        {filteredData.map((section, index) => (
          <Card key={index} item={section} />
        ))}
      </main>
    </>
  );
}
