import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import { CategoryNew, NormalizedAvgParams } from '@/types';
import { fetcher } from '@/libs/fetcher';

const data = {
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  data: [
    {
      label: 'category1',
      items: [
        {
          label: 'Item 1',
          percent: 2,
          percent_avg_diff: NormalizedAvgParams.NORMAL,
        },
        {
          label: 'Item 2',
          percent: 2,
          percent_avg_diff: NormalizedAvgParams.ABOVE,
        },
      ],
    },
    {
      label: 'category2',
      items: [
        {
          label: 'Item 3',
          percent: 2,
          percent_avg_diff: NormalizedAvgParams.BELOW,
        },
      ],
    },
  ],
};

jest.mock('../libs/fetcher', () => ({
  fetcher: jest.fn(),
}));

describe('Home page', () => {
  beforeEach(() => {
    (fetcher as jest.Mock).mockResolvedValue(data);
  });

  it('renders the page title and subtitle', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Test Subtitle'
      );
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Test Title'
      );
    });
  });

  it('renders the card components with the correct data', async () => {
    render(<Home />);

    await waitFor(() => {
      const categories: CategoryNew[] = data.data;

      categories.forEach((category) => {
        const categoryTitle = screen.getByRole('heading', {
          level: 3,
          name: category.label,
        });

        expect(categoryTitle).toBeInTheDocument();

        category.items.forEach((item) => {
          const itemTitle = screen.getByRole('heading', {
            level: 4,
            name: item.label,
          });
          expect(itemTitle).toBeInTheDocument();
          expect(itemTitle.previousElementSibling).toHaveTextContent(
            `${item.percent}%`
          );
        });
      });
    });
  });

  it('filters data after click on filter button', async () => {
    render(<Home />);

    await waitFor(() => {
      const aboveButton = screen.getByLabelText('ABOVE');
      const allButton = screen.getByLabelText('ALL');
      const belowButton = screen.getByLabelText('BELOW');

      fireEvent.click(aboveButton);
      const item2CardItem = screen.getAllByLabelText('Card item');
      expect(item2CardItem).toHaveLength(1);
      expect(item2CardItem[0]).toHaveTextContent('Item 2');

      fireEvent.click(allButton);
      const itemCardItems = screen.getAllByLabelText('Card item');
      expect(itemCardItems).toHaveLength(3);

      fireEvent.click(belowButton);
      const item3CardItem = screen.getAllByLabelText('Card item');
      expect(item3CardItem).toHaveLength(1);
      expect(item3CardItem[0]).toHaveTextContent('Item 3');
    });
  });
});
