import { render, screen, fireEvent } from '@testing-library/react';

import { Card } from '@/components/Card';
import { CategoryNew, NormalizedAvgParams } from '@/types';

describe('Card component', () => {
  const category: CategoryNew = {
    label: 'Category 1',
    items: [
      {
        label: 'Item 1',
        percent: 30,
        percent_avg_diff: NormalizedAvgParams.ABOVE,
      },
      {
        label: 'Item 2',
        percent: 40,
        percent_avg_diff: NormalizedAvgParams.BELOW,
      },
      {
        label: 'Item 3',
        percent: 50,
        percent_avg_diff: NormalizedAvgParams.NORMAL,
      },
      {
        label: 'Item 4',
        percent: 60,
        percent_avg_diff: NormalizedAvgParams.ABOVE,
      },
      {
        label: 'Item 5',
        percent: 70,
        percent_avg_diff: NormalizedAvgParams.BELOW,
      },
      {
        label: 'Item 6',
        percent: 80,
        percent_avg_diff: NormalizedAvgParams.NORMAL,
      },
    ],
  };

  it('renders the category title and a limited number of items by default', () => {
    render(<Card item={category} limit={3} />);

    const titleElement = screen.getByText('Category 1');
    expect(titleElement).toBeInTheDocument();

    const items = screen.getAllByLabelText('Card item');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
    expect(items[2]).toHaveTextContent('Item 3');

    const showMoreButton = screen.getByRole('button', {
      name: 'Zobrazit více',
    });
    expect(showMoreButton).toBeInTheDocument();
    expect(showMoreButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders all items when the "show more" button is clicked', () => {
    render(<Card item={category} limit={3} />);

    const showMoreButton = screen.getByRole('button', {
      name: 'Zobrazit více',
    });

    fireEvent.click(showMoreButton);

    const items = screen.getAllByLabelText('Card item');
    expect(items).toHaveLength(6);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
    expect(items[2]).toHaveTextContent('Item 3');
    expect(items[3]).toHaveTextContent('Item 4');
    expect(items[4]).toHaveTextContent('Item 5');
    expect(items[5]).toHaveTextContent('Item 6');

    expect(showMoreButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders no "show more" button when there are no more items to show', () => {
    render(
      <Card
        item={{ ...category, items: category.items.slice(0, 2) }}
        limit={3}
      />
    );

    const showMoreButton = screen.queryByRole('button', {
      name: 'Zobrazit více',
    });
    expect(showMoreButton).not.toBeInTheDocument();
  });
});
