import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import AlertMessage from '../../shared/components/AlertMessage';
import { TableLayoutWrapper } from '../../shared/components/table/TableLayoutWrapper';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../shared/context/SourceApplicationContext';
import { defaultAlert } from '../../shared/defaults/alertMessages';
import { IAlertContent } from '../../shared/types/AlertContent';
import InstanceTable from './components/InstanceTable';
import FilterToolbar from './filter/FilterToolbar';

const Instances: React.FC = () => {
    const { getLatestMetadata } = useContext(SourceApplicationContext);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);
    const history = useNavigate();
    const [alertContent, setAlertContent] = useState<IAlertContent>(defaultAlert);

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
        <>
            <AlertMessage
                id="instances-bulk-actions-alert"
                open={alertContent.severity !== 'announcement'}
                onClose={() => setAlertContent(defaultAlert)}
                status={alertContent.severity}
                title={alertContent.message}
                content={alertContent.content}
                autoHideDuration={10000}
            />
            <TableLayoutWrapper
                paginationVariant="load-more"
                toolbar={<FilterToolbar onAlert={setAlertContent} />}
            >
                <InstanceTable />
            </TableLayoutWrapper>
        </>
    );
};

export default Instances;
