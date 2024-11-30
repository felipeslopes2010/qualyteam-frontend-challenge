import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { DocumentFilter } from './index';

it('should render the document filter with all its components', async () => {
    render(<DocumentFilter />);

    await waitFor(() => {
        const filterContainer = screen.getByLabelText(/document filter/i)
        expect(filterContainer).toBeInTheDocument();

        const titleFilterInput = screen.getByRole('textbox', { name: /title/i });
        expect(titleFilterInput).toBeInTheDocument();

        const processFilterSelect = screen.getByRole('combobox', { name: /processes/i });
        expect(processFilterSelect).toBeInTheDocument();

        const eraseButton = screen.getByRole('button', { name: /erase/i });
        expect(eraseButton).toBeInTheDocument();

        const filterButton = screen.getByRole('button', { name: /filter/i });
        expect(filterButton).toBeInTheDocument();
    });
});