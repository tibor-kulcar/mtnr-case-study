import { CategoryNew, FilterParams, NormalizedAvgParams } from '@/types';

const filterData = (data: CategoryNew[], filter: FilterParams) => {
  if (filter === FilterParams.ALL) {
    return data;
  } else {
    const filteredGroups = (data || [])
      .map((group) => {
        const filteredItems = group.items.filter(
          (item) => item.percent_avg_diff === NormalizedAvgParams[filter]
        );
        return filteredItems.length > 0
          ? { ...group, items: filteredItems }
          : null;
      })
      .filter(Boolean) as CategoryNew[];
    return filteredGroups;
  }
};

export default filterData;
