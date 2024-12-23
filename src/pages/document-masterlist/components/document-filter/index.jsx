import { useState, useEffect } from 'react';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { Select } from '../../../../components/select';

import { RxEraser } from "react-icons/rx";
import { TfiSearch } from "react-icons/tfi";

import api from '../../../../api';

import './index.css';

export const DocumentFilter = ({ onFilter }) => {
    const [filteredTitle, setFilteredTitle] = useState('');
    const [filteredProcess, setFilteredProcess] = useState('');
    const [processes, setProcesses] = useState([]);
    const [shouldFilterAfterErase, setShouldFilterAfterErase] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchDocumentsUsingFilter = async () => {
        setIsLoading(true);

        try {
            if (filteredTitle && filteredProcess) {
                const documentsResponse = await api.get(`/documents?title_like=${filteredTitle}`);

                const processResponse = await api.get(`/processes?name_like=${filteredProcess}`);
                const processIds = processResponse.data.map((process) => process.id);

                const documentsWithProcesses = documentsResponse.data.filter((document) =>
                    document.processes.some((process) => processIds.includes(process.id))
                );

                if (documentsWithProcesses.length > 0) {
                    onFilter(documentsWithProcesses);
                } else {
                    onFilter([]);
                }
            } else if (filteredTitle) {
                const documentsResponse = await api.get(`/documents?title_like=${filteredTitle}`);
                onFilter(documentsResponse.data);
            } else if (filteredProcess) {
                const processResponse = await api.get(`/processes?name_like=${filteredProcess}`);
                const processIds = processResponse.data.map((process) => process.id);

                if (processIds.length > 0) {
                    const documentResponse = await api.get(`/documents`);
                    const filteredDocuments = documentResponse.data.filter((document) =>
                        document.processes.some((process) => processIds.includes(process.id))
                    );
                    onFilter(filteredDocuments);
                } else {
                    onFilter([]);
                }
            } else {
                const response = await api.get(`/documents`);
                onFilter(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleEraseFilterInput = () => {
        setFilteredTitle('');
        setFilteredProcess('');
        setShouldFilterAfterErase(true);
    }

    useEffect(() => {
        const fetchProcesses = async() => {
            try {
                const processResponse = await api.get('/processes');
                setProcesses(processResponse.data);
            } catch (error) {
                console.error('Error to find process:', error);
            }
        }
        fetchProcesses();
    }, []);

    useEffect(() => {
        if (shouldFilterAfterErase) {
            handleSearchDocumentsUsingFilter();
            setShouldFilterAfterErase(false);
        }
    }, [shouldFilterAfterErase]);

    return (
        <div className="document-filter-container" aria-label="Document Filter">
            <div className="document-filter-fields-wrapper">
                <Input
                    id="document-title-filter"
                    className="document-filter-input"
                    placeholder="Enter a title"
                    label="Title"
                    value={filteredTitle}
                    onChange={(e) => setFilteredTitle(e.target.value)}
                />
                <Select
                    id="document-processes-filter"
                    label="Processes"
                    options={processes}
                    value={filteredProcess}
                    onChange={(e) => setFilteredProcess(e.target.value)}
                />
            </div>
            <div className="document-filter-buttons-wrapper">
                <Button title="Erase" aria-label="Erase" className="document-filter-erase" onClick={handleEraseFilterInput} disabled={isLoading}>
                    <RxEraser size={16} />
                </Button>
                <Button title="Filter" aria-label="Filter" onClick={handleSearchDocumentsUsingFilter} disabled={isLoading}>
                    <TfiSearch size={16} />
                </Button>
            </div>
        </div>
    );
};
