import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';

import api from '../../../../api';

import "./index.css";

export const DocumentFilter = ({ onFilter }) => {
    let filteredTitle;
    let filteredProcess;

    function handleTitleFilter(event) {
        filteredTitle = event.target.value;
    }

    function handleProcessFilter(event) {
        filteredProcess = event.target.value;
    }

    async function handleSearchDocumentsUsingFilter(filteredTitle, filteredProcess) {
        try {
            if (filteredTitle && filteredProcess) {
                const documentsResponse = await api.get(`/documents?title_like=${filteredTitle}`);

                const processResponse = await api.get(`/processes?name_like=${filteredProcess}`);
                const processIds = processResponse.data.map(process => process.id);
        
                const documentsWithProcesses = documentsResponse.data.filter(document =>
                    document.processes.some(process => processIds.includes(process.id))
                );
        
                console.log(documentsWithProcesses);
        
                if (documentsWithProcesses.length > 0) {
                    onFilter(documentsWithProcesses);
                } else {
                    onFilter([]);
                }
            }
            else if (filteredTitle) {
                const documentsResponse = await api.get(`/documents?title_like=${filteredTitle}`);
                onFilter(documentsResponse.data);
            } else if (filteredProcess) {
                const processResponse = await api.get(`/processes?name_like=${filteredProcess}`);
                const processIds = processResponse.data.map(process => process.id);

                if (processIds.length > 0) {
                    const documentResponse = await api.get(`/documents`);
                    const filteredDocuments = documentResponse.data.filter(document =>
                        document.processes.some(process => processIds.includes(process.id))
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
        }
    }

    return (
        <div className="document-filter-container">
            <div className="document-filter-fields-wrapper">
                <Input id="document-title-filter" placeholder="Enter a title" label="Title" onChange={handleTitleFilter} />
                <Input id="document-processs-filter" placeholder="Enter a process" label="Process" onChange={handleProcessFilter} />
            </div>
            <Button title="Filter" onClick={() => handleSearchDocumentsUsingFilter(filteredTitle, filteredProcess)} />
        </div>
    );
};
