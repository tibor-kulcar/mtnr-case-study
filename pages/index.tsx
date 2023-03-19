import Head from 'next/head';
import React, { useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';

import { CategoryNew, FilterParams, NormalizedAvgParams } from '@/types';
import { fetcher } from '@/libs/fetcher';
import { Card } from '@/components/Card';
import { Filter } from '@/components/Filter';
import styles from '@/styles/Home.module.css';

const dataUrl = '/data/demographics.json';

export default function Home() {
  const [filteredData, setFilteredData] = useState<CategoryNew[]>();
  const { data, error, isLoading } = useSWR(dataUrl, fetcher);

  useEffect(() => {
    if (data && data.data) {
      setFilteredData(data.data);
    }
  }, [data]);

  const filterData = useCallback(
    (filter: FilterParams) => {
      if (filter === FilterParams.ALL) {
        setFilteredData(data?.data);
      } else {
        const filteredGroups = (data?.data || [])
          .map((group) => {
            const filteredItems = group.items.filter(
              (item) => item.percent_avg_diff === NormalizedAvgParams[filter]
            );
            return filteredItems.length > 0
              ? { ...group, items: filteredItems }
              : null;
          })
          .filter(Boolean) as CategoryNew[];
        setFilteredData(filteredGroups);
      }
    },
    [setFilteredData, data]
  );

  return (
    <>
      {isLoading ? (
        <>
          <main className={styles.main}>
            <h1>Čekám na data...</h1>
          </main>
        </>
      ) : (
        <>
          <Head>
            <title>{data?.title}</title>
            <meta name="description" content={data?.subtitle} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <div className={styles.description}>
              <h1>{data?.subtitle}</h1>
              <h2>{data?.title}</h2>
            </div>

            <Filter onFilter={filterData} />

            {filteredData?.map((section, index) => (
              <Card key={index} item={section} />
            ))}
          </main>
        </>
      )}
      {error && (
        <main className={styles.main}>
          <h1>
            Vyskytla se chyba při načítání dat. Zkuste to za chvíli znovu.
          </h1>
        </main>
      )}
    </>
  );
}
