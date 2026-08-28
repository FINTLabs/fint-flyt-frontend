import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { TableLayoutWrapper } from '../../shared/components/table/TableLayoutWrapper';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../shared/context/SourceApplicationContext';
import InstanceTable from './components/InstanceTable';
import FilterToolbar from './filter/FilterToolbar';

const Instances: React.FC = () => {
    const { getLatestMetadata } = useContext(SourceApplicationContext);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);
    const history = useNavigate();

    useEffect(() => {
        if (authorized === false) {
            history('/forbidden');
        }
    }, [authorized]);

    useEffect(() => {
        getAuthorization();
    }, []);

    useEffect(() => {
        getLatestMetadata();
    }, []);

    return (
        <TableLayoutWrapper paginationVariant="load-more" toolbar={<FilterToolbar />}>
            <InstanceTable />
        </TableLayoutWrapper>
    );
};

export default Instances;
