import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './index';

const mockedDocuments = [
    {
        id: 1,
        code: "PO001",
        title: "Safety and mission assurance",
        active: true,
        published: true,
        "release-date": "02/12/2019",
        processes: [
            { id: 1, name: "Production" },
            { id: 2, name: "Quality Management" },
        ]
    },
    {
        id: 2,
        code: "PO002",
        title: "Software assurance research program",
        active: true,
        published: true,
        "release-date": "12/12/2019",
        processes: [
            { id: 3, name: "Sales" },
        ]
    },
    {
        id: 3,
        code: "PO003",
        title: "Mission Critical System Software",
        active: true,
        published: true,
        "release-date": "22/02/2020",
        processes: [
            { id: 2, name: "Quality Management" },
        ]
    },
    {
        id: 4,
        code: "PO004",
        title: "Automation and Machine Learning",
        active: true,
        published: true,
        "release-date": "15/05/2020",
        processes: [
            { id: 1, name: "Production" },
        ]
    },
    {
        id: 5,
        code: "PO005",
        title: "Big Data Processing",
        active: true,
        published: true,
        "release-date": "08/11/2020",
        processes: [
            { id: 3, name: "Sales" },
        ]
    },
];

describe('Table Component Pagination', () => {
    it('should render the first page with correct items', () => {
        render(<Table header={[{ title: "Title", column: "title" }]} rows={mockedDocuments} itemsPerPage={3} />);

        expect(screen.getByText('Safety and mission assurance')).toBeInTheDocument();
        expect(screen.getByText('Software assurance research program')).toBeInTheDocument();
        expect(screen.getByText('Mission Critical System Software')).toBeInTheDocument();

        expect(screen.queryByText('Automation and Machine Learning')).not.toBeInTheDocument();
        expect(screen.queryByText('Big Data Processing')).not.toBeInTheDocument();

        expect(screen.getByText('1 / 2')).toBeInTheDocument();
        expect(screen.queryByText('2 / 2')).not.toBeInTheDocument();
    });

    it('should go to the next page when clicking next', () => {
        render(<Table header={[{ title: "Title", column: "title" }]} rows={mockedDocuments} itemsPerPage={3} />);

        const nextButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextButton);

        expect(screen.queryByText('Safety and mission assurance')).not.toBeInTheDocument();
        expect(screen.queryByText('Software assurance research program')).not.toBeInTheDocument();
        expect(screen.queryByText('Mission Critical System Software')).not.toBeInTheDocument();

        expect(screen.getByText('Automation and Machine Learning')).toBeInTheDocument();
        expect(screen.getByText('Big Data Processing')).toBeInTheDocument();

        expect(screen.queryByText('1 / 2')).not.toBeInTheDocument();
        expect(screen.getByText('2 / 2')).toBeInTheDocument();
    });

    it('should go to the previous page when clicking previous', () => {
        render(<Table header={[{ title: "Title", column: "title" }]} rows={mockedDocuments} itemsPerPage={3} />);

        const nextButton = screen.getByRole('button', { name: /next/i });

        fireEvent.click(nextButton);

        const prevButton = screen.getByRole('button', { name: /previous/i });

        fireEvent.click(prevButton);

        expect(screen.getByText('Safety and mission assurance')).toBeInTheDocument();
        expect(screen.getByText('Software assurance research program')).toBeInTheDocument();
        expect(screen.getByText('Mission Critical System Software')).toBeInTheDocument();

        expect(screen.queryByText('Automation and Machine Learning')).not.toBeInTheDocument();
        expect(screen.queryByText('Big Data Processing')).not.toBeInTheDocument();

        expect(screen.getByText('1 / 2')).toBeInTheDocument();
        expect(screen.queryByText('2 / 2')).not.toBeInTheDocument();
    });

    it('should disable the previous button on the first page', () => {
        render(<Table header={[{ title: "Title", column: "title" }]} rows={mockedDocuments} itemsPerPage={3} />);

        const prevButton = screen.getByRole('button', { name: /previous/i });
        const nextButton = screen.getByRole('button', { name: /next/i });

        expect(prevButton).toBeDisabled();
        expect(nextButton).toBeEnabled();
    });

    it('should disable the next button on the last page', () => {
        render(<Table header={[{ title: "Title", column: "title" }]} rows={mockedDocuments} itemsPerPage={3} />);

        const prevButton = screen.getByRole('button', { name: /previous/i });
        const nextButton = screen.getByRole('button', { name: /next/i });

        fireEvent.click(nextButton);

        expect(prevButton).toBeEnabled();
        expect(nextButton).toBeDisabled();
    });
});
