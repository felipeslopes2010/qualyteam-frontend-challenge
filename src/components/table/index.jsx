import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table as ReactstrapTable } from 'reactstrap';
import { noop } from '@babel/types';
import './index.css';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


// Example of use

{/* <Table
    header={[
        {
            title: "A",
            column: "a",
        }
    ]}
    rows={[
        {
            a: "Example1"
        }, {
            a: "Example2"
        }, {
            a: "Example3"
        }, {
            a: "Example4"
        }, {
            a: "Example5"
            onClick: () => alert(`item ${5} clicked!`)
        }, {
            a: "Example6"
        },
    ]}
    itemsPerPage={3}
/> */}

const Table = ({ header, rows, itemsPerPage, page, setPage }) => {

    const totalItems = rows.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const isEmptyState = (rows) => rows.length === 0;

    const handleNextPageButton = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPageButton = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    let rowsToRender;
    if (itemsPerPage) {
        rowsToRender = rows.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);
    } else {
        rowsToRender = rows;
    }

    return (
        <div>
            <div className="table-container">
                <ReactstrapTable hover>
                    <thead>
                        <tr>
                            {header.map((h, index) => <th key={`header-${index}`}>{h.title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isEmptyState(rowsToRender) ? (
                                <tr className="no-documents-found">
                                    <td colSpan={header.length} className="no-documents-message">
                                        No documents found
                                    </td>
                                </tr>
                            ) : (
                                rowsToRender.map((row, index) => (
                                    <tr key={`row-${index}`} onClick={row.onClick || noop}>
                                        {header.map((h, index) =>
                                            <td key={`data-${index}`}>
                                                {row[h.column]}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </ReactstrapTable>
            </div>
            {itemsPerPage &&
                <div className="table-pagination">
                    <Button onClick={handlePreviousPageButton} disabled={page === 1} aria-label="Previous">
                        <MdKeyboardArrowLeft size={22} />
                    </Button>
                    <div className="table-pagination--page-display">
                        {page} / {totalPages}
                    </div>
                    <Button onClick={handleNextPageButton} disabled={page >= totalPages} aria-label="Next">
                        <MdKeyboardArrowRight size={22} />
                    </Button>
                </div>
            }
        </div>
    );
}

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired
}

export default Table;