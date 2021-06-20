import React from 'react';

import './index.css';

const PageHeader = ({ title, caption }) => {
    return (
        <div className="page-header">
            <h1 className="page-header__title">
                {title}
            </h1>
            {caption &&
                <h7 className="page-header__caption">
                    {caption}
                </h7>
            }
        </div>
    )
};

PageHeader.propTypes = {

}

export default PageHeader;