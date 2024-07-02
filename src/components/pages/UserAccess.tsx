import { RouteComponent } from "../../routes/Route";
import PageTemplate from "../templates/PageTemplate";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../context/AuthorizationContext";
import { useHistory } from "react-router-dom";
import { Alert, Box, Button, Checkbox, Heading, HStack, Loader, Table, VStack } from "@navikt/ds-react";
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

    if (!hasAccessToUserPermissionPage) {
        history.push('/');
    }

    const [users, setUsers] = useState<IUser[] | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        AuthorizationRepository.getUsers(page, pageSize)
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
    }, [page]);

    const updateUsers = () => {
        setEditMode(false);
        AuthorizationRepository.updateUsers(users ? users : [])
            .then(response => {
                setUsers(response.data);
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
                        <Table id={'useraccess-table'}>
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
                    </VStack>
                    : <Loader />}
            </Box>
        </PageTemplate>
    );
};
export default UserAccess;
