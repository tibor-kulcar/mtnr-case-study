import Head from 'next/head';
import React, { useState, useMemo } from 'react';
import useSWR from 'swr';

import { FilterParams } from '@/types';
import fetcher from '@/libs/fetcher';
import filter from '@/libs/filter';
import { Card } from '@/components/Card';
import { Filter } from '@/components/Filter';
import styles from '@/styles/Home.module.css';

const dataUrl = '/data/demographics.json';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState(FilterParams.ALL);
  const { data, error, isLoading } = useSWR(dataUrl, fetcher);

  // console.time('filterData');

  const filteredData = useMemo(() => {
    return data ? filter(data?.data, activeFilter) : [];
  }, [activeFilter, data]);

  // console.timeEnd('filterData');

  return (
    <>
      {isLoading && (
        <>
          <main className={styles.main}>
            <h1>Čekám na data...</h1>
          </main>
        </>
      )}
      {data && !isLoading && (
        <>
          <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.subtitle} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <div className={styles.description}>
              <h1>{data.subtitle}</h1>
              <h2>{data.title}</h2>
            </div>

            <Filter activeFilter={activeFilter} onFilter={setActiveFilter} />

            {filteredData.map((section, index) => (
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
