import { RouteComponent } from "../../routes/Route";
import PageTemplate from "../templates/PageTemplate";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../context/AuthorizationContext";
import { useHistory } from "react-router-dom";
import { Alert, Box, Button, Checkbox, Heading, HStack, Loader, Table, VStack, Pagination, SortState } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import AuthorizationRepository from "../../api/AuthorizationRepository";
import { PencilWritingIcon } from "@navikt/aksel-icons";
import { IAlertMessage } from "../types/TableTypes";

export interface IUser {
    objectIdentifier: string,
    email: string,
    name: string,
    sourceApplicationIds: number[]
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
    const history = useHistory();
    const { authorized} = useContext(AuthorizationContext)

    if(!authorized) {
        history.push('/forbidden')
    }

    if (!hasAccessToUserPermissionPage) {
        history.push('/');
    }

    const [users, setUsers] = useState<IUser[] | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState<SortState | undefined>({ orderBy: 'name', direction: "ascending" });

    const fetchUsers = () => {
        AuthorizationRepository.getUsers(page - 1, pageSize)
            .then((response) => {
                const pageableResponse: PageableResponse<IUser> = response.data;
                setUsers(pageableResponse.content);
                setTotalPages(pageableResponse.totalPages);
                setError(undefined);
            })
            .catch(() => {
                setUsers([]);
                setError({ message: t('errorMessage') });
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [page, pageSize, sort]);

    const updateUsers = () => {
        setEditMode(false);
        AuthorizationRepository.updateUsers(users ? users : [])
            .then(() => {
                fetchUsers(); // Fetch users after update to refresh the data
            })
            .catch((e) => {
                console.log('error updating data, ', e);
            });
    };

    const updateUserAccess = (sub: string, sourceAppInput: number, permissionCheck: boolean) => {
        if (!users) return;

        const updatedUsers = users.map(user => {
            if (user.objectIdentifier === sub) {
                const newSourceApplicationIds = permissionCheck
                    ? [...user.sourceApplicationIds, sourceAppInput]
                    : user.sourceApplicationIds.filter(sourceAppId => sourceAppId !== sourceAppInput);
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

    const handleSortChange = (sortKey: string) => {
        setSort(prevSort => {
            return prevSort && sortKey === prevSort.orderBy && prevSort.direction === "descending"
                ? undefined
                : {
                    orderBy: sortKey,
                    direction:
                        prevSort && sortKey === prevSort.orderBy && prevSort.direction === "ascending"
                            ? "descending"
                            : "ascending",
                };
        });
    };

    const selectOptions = [
        { value: "10", label: "10" },
        { value: "25", label: "25" },
        { value: "50", label: "50" },
        { value: "100", label: "100" }
    ];

    return (
        <PageTemplate id={'useraccess'} keyPrefix={'pages.useraccess'} customHeading>
            <HStack id={'instances-custom-header'} align={"center"} justify={"space-between"} gap={"2"} wrap={false}>
                <Heading size={"medium"}>{t('header')}</Heading>
                <Button
                    id={'edit-toggle-btn'}
                    disabled={!users || editMode}
                    onClick={() => setEditMode((prevState => !prevState))}
                    size={"small"}
                    icon={<PencilWritingIcon aria-hidden />}
                >{t('button.edit')}
                </Button>
            </HStack>
            {error && <Alert style={{ maxWidth: '100%' }} variant="error">{error.message}</Alert>}
            <Box background={'surface-default'} style={{ height: '70vh', overflowY: "scroll" }}>
                {users ? <VStack gap={"6"}>
                        <Table sort={sort} onSortChange={(sortKey) => handleSortChange(sortKey ? sortKey : "name")} id={'useraccess-table'}>
                            <Table.Header>
                                <Table.Row id={'table-row-header'}>
                                    <Table.ColumnHeader
                                        id={'column-header-name'}>{t('table.column.name')}</Table.ColumnHeader>
                                    <Table.ColumnHeader
                                        id={'column-header-email'}>{t('table.column.email')}</Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-acos'}>ACOS</Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-egrv'}>eGrunnerverv</Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-digisak'}>Digisak</Table.ColumnHeader>
                                    <Table.ColumnHeader id={'column-header-vigo'}>VIGO OT</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users?.map((value, i) => {
                                    return (
                                        <Table.Row id={'table-row-' + i} key={i}>
                                            <Table.DataCell id={'table-row-cell-name-' + i}>{value.name}</Table.DataCell>
                                            <Table.DataCell id={'table-row-cell-' + i}>{value.email}</Table.DataCell>
                                            {[1, 2, 3, 4].map(sourceApp => <Table.DataCell
                                                key={`${value.objectIdentifier}-permission-${sourceApp}`}>
                                                <Checkbox
                                                    id={'check-row-' + i + '-cell-' + sourceApp}
                                                    disabled={!editMode}
                                                    checked={value.sourceApplicationIds.includes(sourceApp)}
                                                    onChange={(e) => updateUserAccess(value.objectIdentifier, sourceApp, e.target.checked)}
                                                    hideLabel
                                                > {t('giveAccess')}
                                                </Checkbox>
                                            </Table.DataCell>)}
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                        {editMode &&
                            <HStack justify={"end"} gap={"6"} style={{ marginRight: '24px' }}>
                                <Button id="form-save-btn" type="submit" onClick={updateUsers}>
                                    {t('button.save')}
                                </Button>
                                <Button id="form-cancel-btn" onClick={() => {
                                    setUsers(users);
                                    setEditMode(false);
                                }}>
                                    {t('button.cancel')}
                                </Button>
                            </HStack>}
                        <HStack justify={"center"} align={"center"} style={{ marginTop: '16px' }}>
                            <Box>
                                <label htmlFor="select-row-count">{t('numberPerPage')}</label>
                                <select id="select-row-count" value={pageSize} onChange={handlePageSizeChange}>
                                    {selectOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </Box>
                            <Pagination
                                page={page}
                                onPageChange={handlePageChange}
                                count={totalPages}
                                size="small"
                            />
                        </HStack>
                    </VStack>
                    : <Loader />}
            </Box>
        </PageTemplate>
    );
};
export default UserAccess;
