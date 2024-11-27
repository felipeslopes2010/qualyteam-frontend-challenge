
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
    
    function handleSearchDocumentsUsingFilter(filteredTitle, filteredProcess) {
        if (filteredTitle) {
            api.get(`/documents?q=${filteredTitle}`)
                .then(response => {
                    onFilter(response.data);
                })
                .catch(error => console.log(error));
        }
    
        else if(filteredProcess) {
            api.get(`/documents?q=${filteredProcess}`)
                .then(response => {
                    onFilter(response.data);
                })
                .catch(error => console.log(error));
        }
        else {
            api.get(`/documents`)
            .then(response => {
                onFilter(response.data);
            })
            .catch(error => console.log(error));
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
