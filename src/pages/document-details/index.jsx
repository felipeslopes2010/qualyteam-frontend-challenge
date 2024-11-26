import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';

export const DocumentDetails = (props) => {
    const [document, setDocument] = useState({});

    const params = useParams();

    useEffect(() => {
        api.get(`/documents/${params.id}`)
            .then(response => setDocument(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <PageHeader
                title="Document Details"
            />
            <PageContent>
                <div>
                    {document?.code}
                </div>
                <div>
                    {document?.title}
                </div>
                <div>
                    {document['release-date']}
                </div>
                <div>
                    {document?.published}
                </div>
                <div>
                    {document?.active}
                </div>
                <div>
                    <ul>
                    {
                        document.processes && document.processes.map(process => (
                            <li key={process.id}>{process.name}</li>
                        ))
                    }
                    </ul>
                </div>
            </PageContent>
        </div>
    );
}