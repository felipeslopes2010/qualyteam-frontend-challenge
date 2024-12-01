import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import api from '../../api';
import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import { Button } from "../../../src/components/button"

import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import "./index.css";

export const DocumentDetails = () => {
    const [document, setDocument] = useState({});

    const params = useParams();
    const history = useHistory();

    const handleBackToMasterList = () => {
        history.push("/list");
    }

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
                <div className="document-details-container">
                    <div className="document-info">
                        <label htmlFor="code">Code:</label>
                        <span id="code">{document?.code}</span>
                    </div>

                    <div className="document-info">
                        <label htmlFor="title">Title:</label>
                        <span id="title">{document?.title}</span>
                    </div>

                    <div className="document-info">
                        <label htmlFor="release-date">Release Date:</label>
                        <span id="release-date">{document["release-date"]}</span>
                    </div>


                    <div className="document-info">
                        <label htmlFor="published">Published:</label>
                        <span id="published">{document?.published ? <FaCheck color='#008000'/> : <FaXmark color='#FF0000' />}</span>
                    </div>


                    <div className="document-info">
                        <label htmlFor="active">Active:</label>
                        <span id="active">{document?.active ? <FaCheck color='#008000'/> :  <FaXmark color='#FF0000' />}</span>
                    </div>

                    {
                        document?.processes && (
                            <div className="document-info">
                                <label>Processes:</label>
                                <ul>
                                {
                                    document.processes && document.processes.map(process => (
                                        <li key={process.id}>{process.name}</li>
                                    ))
                                }
                                </ul>
                            </div>
                        )
                    }
                    
                    <div className="back-btn-wrapper">
                        <Button className="back-masterlist-btn" title="Back" onClick={handleBackToMasterList}/>
                    </div>
                </div>
            </PageContent>
        </div>
    );
}