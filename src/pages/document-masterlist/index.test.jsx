import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import AxiosMockAdapter from 'axios-mock-adapter';
import api from '../../api';
import { DocumentMasterList } from './index';
import { DocumentFilter } from './components/document-filter';
import Table from '../../components/table';

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
    }
];

const mockedProcesses = [
    { id: 1, name: "Production" },
    { id: 2, name: "Quality Management" },
    { id: 3, name: "Sales" }
];

describe('DocumentMasterList', () => {
    let mock;

    beforeEach(() => {
        mock = new AxiosMockAdapter(api);

        mock.onGet('/documents').reply(config => {
            const titleFilter = new URLSearchParams(config.params).get('title_like');
            const processFilter = new URLSearchParams(config.params).get('processes_like');

            let filteredDocs = mockedDocuments;

            if (titleFilter) {
                filteredDocs = filteredDocs.filter(doc =>
                    doc.title.toLowerCase().includes(titleFilter.toLowerCase())
                );
            }

            if (processFilter) {
                filteredDocs = filteredDocs.filter(doc =>
                    doc.processes.some(process =>
                        process.name.toLowerCase().includes(processFilter.toLowerCase())
                    )
                );
            }

            return [200, filteredDocs];
        });

        mock.onGet('/processes').reply(200, mockedProcesses);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should render the page title', async () => {
        render(<DocumentMasterList />);

        await waitFor(() => {
            expect(screen.getByText('Master List')).toBeInTheDocument();
        });
    });

    it('should erase the title filter', async () => {
        const onFilterMock = jest.fn();

        render(<DocumentFilter onFilter={onFilterMock} />);

        const titleFilterInput = screen.getByRole('textbox', { name: /title/i });

        await act(async () => {
            fireEvent.change(titleFilterInput, { target: { value: 'Safety' } });
        });

        expect(titleFilterInput).toHaveValue('Safety');

        const eraseButton = screen.getByRole('button', { name: /erase/i });

        await act(async () => {
            fireEvent.click(eraseButton);
        });

        expect(titleFilterInput).toHaveValue('');

        expect(onFilterMock).toHaveBeenCalledTimes(1);
        expect(onFilterMock).toHaveBeenCalledWith(mockedDocuments);
    });

    it('should render "No documents found" if theres no documents to show', async () => {
        const onFilterMock = jest.fn();
        const header = [{ title: 'Title', column: 'title' }];
        const rows = [];
        const setPage = jest.fn();

        render(<DocumentFilter onFilter={onFilterMock} />);
        render(<Table header={header} rows={rows} itemsPerPage={3} page={1} setPage={setPage} />);

        const titleFilterInput = screen.getByRole('textbox', { name: /title/i });

        await act(async () => {
            fireEvent.change(titleFilterInput, { target: { value: 'Test' } });
        });

        expect(titleFilterInput).toHaveValue('Test');

        const filterButton = screen.getByRole('button', { name: /filter/i });

        await act(async () => {
            fireEvent.click(filterButton);
        });

        expect(screen.getByText('No documents found')).toBeInTheDocument();
    });


    // it('should filter the documents based on title and process', async () => {
    //     const onFilterMock = jest.fn();

    //     render(<DocumentFilter onFilter={onFilterMock} />);

    //     const titleFilterInput = screen.getByRole('textbox', { name: /title/i });
    //     const processFilterSelect = screen.getByRole('combobox', { name: /processes/i });

    //     // Simula a mudança no título e no processo
    //     await act(async () => {
    //         fireEvent.change(titleFilterInput, { target: { value: 'Safety' } });  // Título "Safety"
    //         fireEvent.change(processFilterSelect, { target: { value: 'Production' } });  // Processo "Production"
    //         const filterButton = screen.getByRole('button', { name: /filter/i });
    //         fireEvent.click(filterButton);
    //     });

    //     await new Promise(resolve => setTimeout(resolve, 5000)); 

    //     // Espera o filtro ser aplicado e verifica se a função onFilter foi chamada
    //     await waitFor(() => {
    //         expect(onFilterMock).toHaveBeenCalledTimes(1);  // Verifica se o filtro foi chamado
    //         expect(onFilterMock).toHaveBeenCalledWith([
    //             { id: 1, code: "PO001", title: "Safety and mission assurance", active: true, published: true, "release-date": "02/12/2019", processes: [{ id: 1, name: "Production" }, { id: 2, name: "Quality Management" }] }
    //         ]);  // Verifica se a resposta está correta após o filtro
    //     });
    // });

});
