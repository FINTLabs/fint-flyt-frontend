import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { TableLayoutWrapper } from '../../shared/components/table/TableLayoutWrapper';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import UserAccessTable from './components/UserAccessTable';
import { UserAccessToolbar } from './components/UserAccessToolbar';

const UserAccess: React.FC = () => {
    const { hasAccessToUserPermissionPage, authorized } = useContext(AuthorizationContext);
    const history = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [hasUsers, setHasUsers] = useState(false);

    useEffect(() => {
        if (authorized === false) {
            history('/forbidden');
        }
    }, [authorized, history]);

    if (!hasAccessToUserPermissionPage) {
        history('/');
    }

    return (
        <TableLayoutWrapper
            toolbar={
                <UserAccessToolbar
                    disabled={!hasUsers || editMode}
                    onEdit={() => setEditMode((prev) => !prev)}
                />
            }
        >
            <UserAccessTable
                editMode={editMode}
                setEditMode={setEditMode}
                onUsersLoaded={setHasUsers}
            />
        </TableLayoutWrapper>
    );
};

export default UserAccess;
