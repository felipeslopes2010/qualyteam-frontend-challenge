import React from 'react';

import { Row, Col } from 'reactstrap';

import PageContent from '../../components/page-content';
import PageHeader from '../../components/page-header';
import RouteCard from './components/route-card';

export const Home = () => {
    return (
        <>
            <PageHeader
                title="Home"
                caption="Here you can navigate to other functions of the system"
            />
            <PageContent>
                <Row gutter={8}>
                    <Col style={{ marginBottom: '24px' }} sm={6} md={6} lg={4}>
                        <RouteCard
                            title="Master List"
                            caption="View document listing"
                            actionText="Go"
                            route="/list"
                        />
                    </Col>
                    <Col style={{ marginBottom: '24px' }} sm={6} md={6} lg={4}>
                        <RouteCard
                            title="Creat Document"
                            caption="Insert new document"
                            actionText="Go"
                            disabled
                        />
                    </Col>
                    <Col style={{ marginBottom: '24px' }} sm={6} md={6} lg={4}>
                        <RouteCard
                            title="Reports"
                            caption="View documents reports"
                            actionText="Go"
                            disabled
                        />
                    </Col>
                </Row>
            </PageContent>
        </>
    )
}
