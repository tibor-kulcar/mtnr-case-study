export type Item = {
  label: string;
  percent: number;
  percent_avg: number;
};

export type Category = {
  label: string;
  items: Item[];
};

export enum NormalizedAvgParams {
  ABOVE = 'ABOVE',
  BELOW = 'BELOW',
  NORMAL = 'NORMAL',
}

export type ItemNew = {
  label: string;
  percent: number;
  percent_avg_diff: NormalizedAvgParams;
};

export type CategoryNew = {
  label: string;
  items: ItemNew[];
};

export enum FilterParams {
  ABOVE = 'ABOVE',
  BELOW = 'BELOW',
  ALL = 'ALL',
}
