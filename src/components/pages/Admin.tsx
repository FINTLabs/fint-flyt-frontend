import {RouteComponent} from "../../routes/Route";
import PageTemplate from "../templates/PageTemplate";
import {useContext, useEffect, useState} from "react";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import {useHistory} from "react-router-dom";
import {Box, Table, Checkbox, VStack, HStack, Button, Heading, Loader} from "@navikt/ds-react";

import * as React from "react";
import {Page} from "../types/TableTypes";
import {useTranslation} from "react-i18next";
import AuthorizationRepository from "../../api/AuthorizationRepository";
import {PencilWritingIcon} from "@navikt/aksel-icons";

export interface IUser {
    id: string,
    admin: boolean,
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

    const userDef: IUser[] = [
        {
            "id": "1",
            "admin": true,
            "email": "navn@domene.no",
            "access": ["1","3","4"]
        },
        {
            "id": "2",
            "admin": false,
            "email": "navn@domene.no",
            "access": ["1"]
        },
        {
            "id": "3",
            "admin": false,
            "email": "navn@domene.no",
            "access": ["2","4"]

        }
    ]

    const [users, setUsers] = useState<IUser[] | undefined>(undefined)
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        AuthorizationRepository.getUsers().then(r => setUsers(userDef)).catch(() => setUsers(userDef))
    }, []);


    const updateUsers = () => {
        setUsers(users)
        setEditMode(false)
        AuthorizationRepository.updateUsers(users ? users : [])
    }

    const updateUserAccess = (id: string, sourceApp: string, accessCheck: boolean) => {
        if (!users) return;

        const updatedUsers = users.map(user => {
            if (user.id === id) {
                const newAccess = accessCheck
                    ? [...user.access, sourceApp]
                    : user.access.filter(access => access !== sourceApp);
                return { ...user, access: newAccess };
            }
            return user;
        });

        setUsers(updatedUsers);
    };

    useEffect(() => {
        console.log('Users state updated:', users);
    }, [users]);


    return (
        <PageTemplate id={'admin'} keyPrefix={'pages.admin'} customHeading>
            <HStack id={'instances-custom-header'} align={"center"} justify={"space-between"} gap={"2"} wrap={false}>
                <Heading size={"medium"}>{t('header')}</Heading>
                <Button
                    disabled={editMode}
                    onClick={() => setEditMode((prevState => !prevState))}
                    size={"small"}
                    icon={<PencilWritingIcon aria-hidden/>}
                >{t('button.edit')}
                </Button>
            </HStack>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                {users ? <VStack gap={"6"}>
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
                                {users?.map((value, i) => {
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
                                    setUsers(userDef)
                                    setEditMode(false)}
                                }>
                                    Avbryt
                                </Button>
                            </HStack>}
                    </VStack>
                     : <Loader/> }
            </Box>
        </PageTemplate>
    );
}
export default Admin;
