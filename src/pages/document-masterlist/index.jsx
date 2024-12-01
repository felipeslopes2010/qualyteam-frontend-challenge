import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import Table from '../../components/table';
import { DocumentFilter } from './components/document-filter';

export const DocumentMasterList = () => {
    const [documents, setDocuments] = useState([]);
    const [page, setPage] = useState(1);

    const history = useHistory();

    const header = [
        { title: "Code", column: "code" },
        { title: "Title", column: "title" },
        { title: "Release Date", column: "releaseDate" },
        { title: "Processes", column: "processes" }
    ];

    const mapDocumentsToRows = (documents) => {
        return documents.map(document => ({
            id: document.id,
            code: document.code,
            title: document.title,
            releaseDate: document['release-date'],
            processes: document.processes?.map(process => process.name).join(', ') || "No process add",
            onClick: () => handleOpenDocumentDetails(document.id)
        }));
    };

    const handleOpenDocumentDetails = (documentId) => {
        history.push(`/document-details/${documentId}`);
    }

    const handleFilterResults = (filteredDocuments) => {
        setDocuments(mapDocumentsToRows(filteredDocuments));
        setPage(1);
    }

    useEffect(() => {
        api.get(`/documents`)
            .then(response => {
                setDocuments(mapDocumentsToRows(response.data));
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <PageHeader title="Master List" />
            <PageContent>
                <DocumentFilter onFilter={handleFilterResults} />
                <Table header={header} rows={documents} itemsPerPage={5} setPage={setPage} page={page} />
            </PageContent>
        </div>
    );
};