import {RouteComponent} from "../../routes/Route";
import PageTemplate from "../templates/PageTemplate";
import {ReactElement, useContext, useEffect, useState} from "react";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import {Link as RouterLink, useHistory} from "react-router-dom";
import {Box, SortState, Switch, Table, Checkbox, VStack, HStack, Button, Heading, HelpText} from "@navikt/ds-react";

import * as React from "react";
import {Page} from "../types/TableTypes";
import {useTranslation} from "react-i18next";
import AuthorizationRepository from "../../api/AuthorizationRepository";
import {PencilWritingIcon, PlusIcon} from "@navikt/aksel-icons";
import {ButtonGroup} from "@mui/material";

export interface IUser {
    id: string,
    email: string,
    access: string[]
}

const Admin: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.admin'})
    const {isAdmin} = useContext(AuthorizationContext)
    const history = useHistory();

    if (!isAdmin) {
        history.push('/')
    }

    const pageDef: Page<IUser> = {
        "content": [
            {
                "id": "1",
                "email": "navn@domene.no",
                "access": ["1","3","4"]
            },
            {
                "id": "2",
                "email": "navn@domene.no",
                "access": ["1"]
            },
            {
                "id": "3",
                "email": "navn@domene.no",
                "access": ["2","4"]

            }
        ],
        "pageable": {
            "sort": {
                "empty": false,
                "unsorted": false,
                "sorted": true
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 100,
            "paged": true,
            "unpaged": false,
            "empty": false,
            "sorted": false,
            "unsorted": false
        },
        "last": true,
        "totalPages": 1,
        "totalElements": 3,
        "first": true,
        "size": 100,
        "number": 0,
        "numberOfElements": 3,
        "empty": false
    }

    const [initUsers, setInitUsers] = useState<Page<IUser> | undefined>(pageDef)
    const [users, setUsers] = useState<Page<IUser> | undefined>(pageDef)
    const [sort, setSort] = useState<SortState | undefined>({orderBy: 'id', direction: "ascending"});
    const [editMode, setEditMode] = useState<boolean>(false)


    const handleSort = (sortKey: string) => {
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

    const updateUsers = () => {
        console.log(users)
        setUsers(users)
        setEditMode(false)
        AuthorizationRepository.updateUsers(users?.content ? users.content : [])
    }

    const updateUserAccess = (id: string, sourceApp: string, checked: boolean) => {
        if (!users) return;

        const updatedUsers = users.content.map(user => {
            if (user.id === id) {
                const newAccess = checked
                    ? [...user.access, sourceApp]
                    : user.access.filter(access => access !== sourceApp);
                return { ...user, access: newAccess };
            }
            return user;
        });

        setUsers({ ...users, content: updatedUsers });
    };

    console.log(initUsers)
    console.log('users', users?.content)

    useEffect(() => {
        console.log('Users state updated:', users);
    }, [users]);

    function checkButton(value: boolean, id: string, sourceApp: string): ReactElement {
        const [checked, setChecked] = useState(value);
        return (
            <Checkbox disabled={!editMode} checked={checked} onChange={(e) => {
                setChecked(e.target.checked)
                updateUserAccess(id, sourceApp, e.target.checked)
            }} hideLabel>
                Gi tilgang
            </Checkbox>
        )
    }

    return (
        <PageTemplate id={'admin'} keyPrefix={'pages.admin'} customHeading>
            <HStack id={'instances-custom-header'} align={"center"} justify={"space-between"} gap={"2"} wrap={false}>
                <HStack align={"center"} gap={"2"}>
                    <Heading size={"medium"}>{t('header')}</Heading>
                    <HelpText title={"Hva er dette"} placement="bottom">
                        {t('help.header')}
                    </HelpText>
                </HStack>
                <Button
                    disabled={editMode}
                    onClick={() => setEditMode((prevState => !prevState))}
                    size={"small"}
                    icon={<PencilWritingIcon aria-hidden/>}
                >{t('button.edit')}
                </Button>
            </HStack>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                <VStack gap={"6"}>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>{t('table.column.id')}</Table.ColumnHeader>
                                <Table.ColumnHeader>{t('table.column.email')}</Table.ColumnHeader>
                                <Table.ColumnHeader>ACOS</Table.ColumnHeader>
                                <Table.ColumnHeader>eGrunnerverv</Table.ColumnHeader>
                                <Table.ColumnHeader>Digisak</Table.ColumnHeader>
                                <Table.ColumnHeader>VIGO OT</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {users?.content?.map((value, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.DataCell>{value.id}</Table.DataCell>
                                        <Table.DataCell>{value.email}</Table.DataCell>
                                        {["1", "2", "3", "4"].map(sourceApp => <Table.DataCell key={`${value.id}-permission-${sourceApp}`}>
                                            <Checkbox
                                                disabled={!editMode}
                                                checked={value.access.includes(sourceApp)}
                                                onChange={(e) => updateUserAccess(value.id, sourceApp, e.target.checked)}
                                                hideLabel
                                            >Gi tilgang
                                            </Checkbox>
                                        </Table.DataCell>)}
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                    {editMode &&
                        <HStack justify={"end"} gap={"6"} style={{marginRight: '24px'}}>
                        <Button id="form-submit-btn" type="submit" onClick={updateUsers}>
                            Lagre
                        </Button>
                        <Button id="form-cancel-btn" onClick={() => {
                            setUsers(pageDef)
                            setEditMode(false)}
                        }>
                            Avbryt
                        </Button>
                    </HStack>}
                </VStack>
            </Box>
        </PageTemplate>
    );
}
export default Admin;
