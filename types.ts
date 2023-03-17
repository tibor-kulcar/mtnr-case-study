export type DataItem = {
  label: string;
  percent: number;
  percent_avg: number;
};

export type ItemNew = {
  label: string;
  percent: number;
  percent_avg_diff: 'below' | 'normal' | 'above';
};

export type Category = {
  label: string;
  items: DataItem[];
};

export type CategoryNew = {
  label: string;
  items: ItemNew[];
};

export enum FilterParams {
  ABOVE = 'above',
  BELOW = 'below',
  ALL = 'all',
}
