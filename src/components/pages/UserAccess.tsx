import { RouteComponent } from '../../routes/Route';
import PageTemplate from '../templates/PageTemplate';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Heading,
    HStack,
    Loader,
    Table,
    VStack,
    Pagination,
} from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import AuthorizationRepository from '../../api/AuthorizationRepository';
import { PencilWritingIcon } from '@navikt/aksel-icons';
import { IAlertMessage } from '../types/TableTypes';

export interface IUser {
    objectIdentifier: string;
    email: string;
    name: string;
    sourceApplicationIds: number[];
}

export interface PageableResponse<T> {
    content: T[];
    pageable: never;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: never;
    numberOfElements: number;
    empty: boolean;
}

const UserAccess: RouteComponent = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.useraccess' });
    const { hasAccessToUserPermissionPage } = useContext(AuthorizationContext);
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const history = useNavigate();
    const { authorized } = useContext(AuthorizationContext);

    if (!authorized) {
        history('/forbidden');
    }

    if (!hasAccessToUserPermissionPage) {
        history('/');
    }

    const [users, setUsers] = useState<IUser[] | undefined>(undefined);
    const [initialState, setInitialState] = useState<IUser[] | undefined>(undefined);

    const [edited, setEdited] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchUsers = () => {
        AuthorizationRepository.getUsers(page - 1, pageSize)
            .then((response) => {
                const pageableResponse: PageableResponse<IUser> = response.data;
                setUsers(pageableResponse.content);
                setInitialState(pageableResponse.content);
                setTotalPages(pageableResponse.totalPages);
                setEdited(false);
                setEditMode(false);
                setError(undefined);
            })
            .catch(() => {
                setUsers([]);
                setError({ message: t('errorMessage') });
            });
    };
    useEffect(() => {
        fetchUsers();
    }, [page, pageSize]);

    const updateUsers = () => {
        AuthorizationRepository.updateUsers(users ? users : [])
            .then(() => {
                fetchUsers(); // Fetch users after update to refresh the data
            })
            .catch((e) => {
                console.log('error updating data, ', e);
            });
    };

    const resetState = () => {
        setUsers(initialState);
        setEdited(false);
        setEditMode(false);
    };

    const updateUserAccess = (sub: string, sourceAppInput: number, permissionCheck: boolean) => {
        if (!users) return;
        setEdited(true);
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

    const handlePageChange = (value: number) => {
        setPage(value);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPageSize(Number(event.target.value));
        setPage(1); // Reset to first page when page size changes
    };

    const selectOptions = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ];

    return (
        <PageTemplate id={'useraccess'} keyPrefix={'pages.useraccess'} customHeading>
            <HStack
                id={'instances-custom-header'}
                align={'center'}
                justify={'space-between'}
                gap={'2'}
                wrap={false}>
                <Heading size={'medium'}>{t('header')}</Heading>
            </HStack>
            {error && (
                <Alert style={{ maxWidth: '100%' }} variant="error">
                    {error.message}
                </Alert>
            )}
            <Box background={'surface-default'} style={{ minHeight: '70vh' }}>
                {users ? (
                    <VStack gap={'6'}>
                        <Table id={'useraccess-table'}>
                            <Table.Header>
                                <Table.Row id={'table-row-header'}>
                                    <Table.ColumnHeader id={'column-header-name'}>
                                        {t('table.column.name')}
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-email'}>
                                        {t('table.column.email')}
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-acos'} align={'center'}>
                                        ACOS
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-egrv'} align={'center'}>
                                        eGrunnerverv
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader
                                        id={'column-header-digisak'}
                                        align={'center'}>
                                        Digisak
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-vigo'} align={'center'}>
                                        VIGO
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader
                                        id={'column-header-altinn'}
                                        align={'center'}>
                                        Altinn
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader
                                        id={'column-header-hmsreg'}
                                        align={'center'}>
                                        HMSReg
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users?.map((value, i) => {
                                    return (
                                        <Table.Row id={'table-row-' + i} key={i}>
                                            <Table.DataCell id={'table-row-cell-name-' + i}>
                                                {value.name}
                                            </Table.DataCell>
                                            <Table.DataCell id={'table-row-cell-' + i}>
                                                {value.email}
                                            </Table.DataCell>
                                            {[1, 2, 3, 4, 5, 6].map((sourceApp) => (
                                                <Table.DataCell
                                                    align={'center'}
                                                    key={`${value.objectIdentifier}-permission-${sourceApp}`}>
                                                    <HStack width={'100%'} justify={'center'}>
                                                        <Checkbox
                                                            size="small"
                                                            id={
                                                                'check-row-' +
                                                                i +
                                                                '-cell-' +
                                                                sourceApp
                                                            }
                                                            disabled={!editMode}
                                                            checked={value.sourceApplicationIds.includes(
                                                                sourceApp
                                                            )}
                                                            onChange={(e) =>
                                                                updateUserAccess(
                                                                    value.objectIdentifier,
                                                                    sourceApp,
                                                                    e.target.checked
                                                                )
                                                            }
                                                            hideLabel>
                                                            {t('giveAccess')}
                                                        </Checkbox>
                                                    </HStack>
                                                </Table.DataCell>
                                            ))}
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>

                        <div style={{ marginTop: '16px', position: 'relative' }}>
                            <HStack
                                justify={'center'}
                                align={'center'}
                                gap={'4'}
                                style={{ marginBottom: '16px' }}>
                                <div
                                    style={{
                                        opacity: editMode ? 0.5 : 1,
                                        pointerEvents: editMode ? 'none' : 'auto',
                                    }}>
                                    <HStack align={'center'} gap={'2'}>
                                        <label htmlFor="select-row-count">
                                            {t('numberPerPage')}
                                        </label>
                                        <select
                                            disabled={editMode}
                                            id="select-row-count"
                                            value={pageSize}
                                            onChange={handlePageSizeChange}>
                                            {selectOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {totalPages > 1 && (
                                            <Pagination
                                                page={page}
                                                onPageChange={handlePageChange}
                                                count={totalPages}
                                                size="small"
                                            />
                                        )}
                                    </HStack>
                                </div>
                            </HStack>
                            <div style={{ position: 'absolute', right: 0, top: 0 }}>
                                {editMode ? (
                                    <HStack justify={'end'} gap={'6'}>
                                        <Button
                                            variant="secondary"
                                            id="form-cancel-btn"
                                            onClick={resetState}
                                            size={'small'}>
                                            {t('button.cancel')}
                                        </Button>
                                        <Button
                                            id="form-save-btn"
                                            type="submit"
                                            onClick={updateUsers}
                                            size={'small'}
                                            disabled={!edited}>
                                            {t('button.save')}
                                        </Button>
                                    </HStack>
                                ) : (
                                    <HStack justify={'end'} gap={'6'}>
                                        <Button
                                            variant="tertiary"
                                            id="edit-toggle-btn"
                                            onClick={() => setEditMode(true)}
                                            icon={<PencilWritingIcon />}
                                            size={'small'}>
                                            {t('button.edit')}
                                        </Button>
                                    </HStack>
                                )}
                            </div>
                        </div>
                    </VStack>
                ) : (
                    <Loader />
                )}
            </Box>
        </PageTemplate>
    );
};
export default UserAccess;
