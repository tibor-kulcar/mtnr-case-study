import Head from 'next/head';
import React, { useState, useCallback } from 'react';

import { Card } from '@/components/Card';
import { Filter } from '@/components/Filter';
import { ItemNew, Category, CategoryNew, FilterParams } from '@/types';
import styles from '@/styles/Home.module.css';

import data from '../public/demographics.json';

type InputData = {
  data: Category[];
};

type OutputData = {
  data: CategoryNew[];
};

const newData = (inputData: InputData): OutputData => {
  console.log('dfsdfdsfdsfdsfdfdsfsdfsdfdsfdsf');
  const outputData: OutputData = {
    data: [],
  };

  for (const category of inputData.data) {
    const roundedItems: ItemNew[] = category.items.map((item) => {
      const diff = item.percent - item.percent_avg;
      const percentAvgDiff =
        diff < -3 ? 'below' : diff > 3 ? 'above' : 'normal';

      return {
        label: item.label,
        percent: Math.round(item.percent),
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

const demographics = newData(data);

export default function Home() {
  const [filteredData, setFilteredData] = useState(demographics.data);

  type Group = {
    label: string;
    items: ItemNew[];
  };

  const filterData = useCallback(
    (filter: FilterParams) => {
      if (filter === 'all') {
        setFilteredData(demographics.data);
      } else {
        const filteredGroups: Group[] = [];
        for (const group of demographics.data) {
          const filteredItems = group.items.filter(
            (item: ItemNew) => item.percent_avg_diff === filter
          );
          if (filteredItems.length > 0) {
            filteredGroups.push({ ...group, items: filteredItems });
          }
        }
        setFilteredData(filteredGroups);
      }
    },
    [setFilteredData, demographics.data]
  );

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
          <h1>{data.subtitle}</h1>
          <h2>{data.title}</h2>
        </div>

        <Filter onFilter={filterData} />

        {filteredData.map((section, index) => (
          <Card key={index} item={section} />
        ))}
      </main>
    </>
  );
}
