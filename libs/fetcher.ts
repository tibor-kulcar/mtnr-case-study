import { ItemNew, Category, CategoryNew, NormalizedAvgParams } from '@/types';

const transformData = (inputData: Category[]): CategoryNew[] => {
  return inputData.map((category) => {
    const normalizedItems: ItemNew[] = category.items.map((item) => {
      const diff = item.percent - item.percent_avg;
      const percentAvgDiff =
        diff < -3
          ? NormalizedAvgParams.BELOW
          : diff > 3
          ? NormalizedAvgParams.ABOVE
          : NormalizedAvgParams.NORMAL;

      return {
        label: item.label,
        percent: Math.round(item.percent),
        percent_avg_diff: percentAvgDiff,
      };
    });

    return {
      label: category.label,
      items: normalizedItems,
    };
  });
};

const fetcher = async (...args: [string, RequestInit?]) => {
  const response = await fetch(...args);
  const { title, subtitle, data } = await response.json();

  return {
    data: transformData(data),
    title,
    subtitle,
  };
};

export default fetcher;
