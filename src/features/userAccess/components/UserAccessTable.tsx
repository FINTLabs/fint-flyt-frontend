import { Box, Button, Checkbox, HStack, Loader, SortState, Table, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAuthorizationRepository from '../../../shared/api/useAuthorizationRepository';
import {
    useTablePageError,
    useTablePagination,
} from '../../../shared/components/table/TablePageContext';
import { Page } from '../../../shared/components/types/TableTypes';
import { IUser } from '../../../shared/components/types/UserTypes';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { ISourceApplication } from '../../configuration/types/SourceApplication';

type Props = {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    onUsersLoaded: (hasUsers: boolean) => void;
};

const UserAccessTable: React.FC<Props> = ({ editMode, setEditMode, onUsersLoaded }) => {
    const AuthorizationRepository = useAuthorizationRepository();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.useraccess' });
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const onError = useTablePageError();
    const { page, rowsPerPage, setPaginationMeta } = useTablePagination();

    const [users, setUsers] = useState<IUser[] | undefined>(undefined);
    const [initialUsers, setInitialUsers] = useState<IUser[] | undefined>(undefined);
    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[] | undefined>(
        undefined
    );
    const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
    const [totalElements, setTotalElements] = useState<number | undefined>(undefined);

    const fetchData = () => {
        Promise.all([
            AuthorizationRepository.getUsers(page - 1, rowsPerPage),
            getAllSourceApplications(true),
        ])
            .then(([userResponse, apps]) => {
                setSourceApplications(apps);
                const pageableResponse: Page<IUser> = userResponse.data;
                const nextTotalPages = pageableResponse.totalPages ?? 0;
                const nextTotalElements = pageableResponse.totalElements ?? 0;
                setUsers(pageableResponse.content);
                setInitialUsers(pageableResponse.content);
                setTotalPages(nextTotalPages);
                setTotalElements(nextTotalElements);
                setPaginationMeta({
                    totalPages: nextTotalPages,
                    totalElements: nextTotalElements,
                    hidePagination: editMode,
                });
                onUsersLoaded(true);
                onError(undefined);
            })
            .catch(() => {
                setUsers([]);
                setTotalPages(undefined);
                setTotalElements(undefined);
                setPaginationMeta({ hidePagination: true });
                onUsersLoaded(false);
                onError({ message: t('errorMessage') });
            });
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (totalElements === undefined) return;
        setPaginationMeta({
            totalPages,
            totalElements,
            hidePagination: editMode,
        });
    }, [editMode, totalPages, totalElements, setPaginationMeta]);

    const updateUsers = () => {
        setEditMode(false);
        AuthorizationRepository.updateUsers(users ? users : [])
            .then(() => {
                fetchData();
            })
            .catch((e) => {
                console.log('error updating data, ', e);
            });
    };

    const updateUserAccess = (sub: string, sourceAppInput: number, permissionCheck: boolean) => {
        if (!users) return;

        const updatedUsers = users.map((user) => {
            if (user.objectIdentifier === sub) {
                const newSourceApplicationIds = permissionCheck
                    ? [...user.sourceApplicationIds, sourceAppInput]
                    : user.sourceApplicationIds.filter(
                          (sourceAppId) => sourceAppId !== sourceAppInput
                      );
                return { ...user, sourceApplicationIds: newSourceApplicationIds };
            }
            return user;
        });

        setUsers(updatedUsers);
    };

    return (
        <Box background={'surface-default'}>
            {users && sourceApplications ? (
                <VStack gap={'6'}>
                    <Table
                        id={'useraccess-table'}
                    >
                        <Table.Header>
                            <Table.Row id={'table-row-header'}>
                                <Table.ColumnHeader id={'column-header-name'}>
                                    {t('table.column.name')}
                                </Table.ColumnHeader>
                                <Table.ColumnHeader id={'column-header-email'}>
                                    {t('table.column.email')}
                                </Table.ColumnHeader>
                                {sourceApplications.map((sourceApp) => (
                                    <Table.ColumnHeader
                                        id={'column-header-acos'}
                                        align={'center'}
                                        key={sourceApp.id}
                                    >
                                        {sourceApp.displayName}
                                    </Table.ColumnHeader>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {users.map((value, i) => (
                                <Table.Row id={'table-row-' + i} key={i}>
                                    <Table.DataCell id={'table-row-cell-name-' + i}>
                                        {value.name}
                                    </Table.DataCell>
                                    <Table.DataCell id={'table-row-cell-' + i}>
                                        {value.email}
                                    </Table.DataCell>
                                    {sourceApplications.map((sourceApp) => (
                                        <Table.DataCell
                                            key={`${value.objectIdentifier}-permission-${sourceApp.id}`}
                                        >
                                            <HStack width={'100%'} justify={'center'}>
                                                <Checkbox
                                                    id={
                                                        'check-row-' +
                                                        i +
                                                        '-cell-' +
                                                        sourceApp.id
                                                    }
                                                    disabled={!editMode}
                                                    checked={value.sourceApplicationIds.includes(
                                                        sourceApp.id
                                                    )}
                                                    onChange={(e) =>
                                                        updateUserAccess(
                                                            value.objectIdentifier,
                                                            sourceApp.id,
                                                            e.target.checked
                                                        )
                                                    }
                                                    hideLabel
                                                >
                                                    {t('giveAccess')}
                                                </Checkbox>
                                            </HStack>
                                        </Table.DataCell>
                                    ))}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {editMode && (
                        <HStack justify={'end'} gap={'6'} style={{ marginRight: '24px' }}>
                            <Button
                                id="form-cancel-btn"
                                variant={'secondary'}
                                onClick={() => {
                                    setUsers(initialUsers);
                                    setEditMode(false);
                                }}
                            >
                                {t('button.cancel')}
                            </Button>
                            <Button id="form-save-btn" type="submit" onClick={updateUsers}>
                                {t('button.save')}
                            </Button>
                        </HStack>
                    )}
                </VStack>
            ) : (
                <Loader />
            )}
        </Box>
    );
};

export default UserAccessTable;
