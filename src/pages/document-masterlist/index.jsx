import React, { useState, useEffect } from 'react';
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import Table from '../../components/table';

export const DocumentMasterList = (props) => {
    const [documents, setDocuments] = useState([]);
    const [formattedRows, setformattedRows] = useState([]);

    const header = [
        { title: "Code", column: "code" },
        { title: "Title", column: "title" },
        { title: "Release Date", column: "releaseDate" },
        { title: "Processes", column: "processes" }
    ];

    const mapDocumentsToRows = (documents) => {
        return documents.map(document => ({
            code: document.code,
            title: document.title,
            releaseDate: document['release-date'],
            processes: document.processes?.map(process => process.name).join(', ') || "Nenhum processo adicionado",
        }));
    };

    useEffect(() => {
        api.get(`/documents`)
            .then(response => {
                setDocuments(response.data);
                setformattedRows(mapDocumentsToRows(response.data));
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <PageHeader title="Master List" />
            <PageContent>
                <Table header={header} rows={formattedRows} itemsPerPage={5} />
            </PageContent>
        </div>
    );
};
