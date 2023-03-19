import { render, screen } from '@testing-library/react';
import { ItemNew, NormalizedAvgParams } from '@/types';
import CardItem from './CardItem';

describe('CardItem', () => {
  const item: ItemNew = {
    label: 'Item Label',
    percent: 80,
    percent_avg_diff: NormalizedAvgParams.ABOVE,
  };

  it('renders the item label', () => {
    render(<CardItem item={item} />);
    const labelElement = screen.getByText('Item Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the item percent', () => {
    render(<CardItem item={item} />);
    const percentElement = screen.getByText('80%');
    expect(percentElement).toBeInTheDocument();
  });

  it('renders the item percent with a green color class when percent_avg_diff is ABOVE', () => {
    render(
      <CardItem
        item={{
          ...item,
          percent_avg_diff: NormalizedAvgParams.ABOVE,
        }}
      />
    );
    const percentElement = screen.getByText('80%');
    expect(percentElement).toHaveClass('cardItemValueGreen');
  });

  it('renders the item percent with a red color class when percent_avg_diff is BELOW', () => {
    render(
      <CardItem
        item={{
          ...item,
          percent_avg_diff: NormalizedAvgParams.BELOW,
        }}
      />
    );
    const percentElement = screen.getByText('80%');
    expect(percentElement).toHaveClass('cardItemValueRed');
  });
});
