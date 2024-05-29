import {RouteComponent} from "../../routes/Route";
import PageTemplate from "../templates/PageTemplate";
import {useContext, useEffect, useState} from "react";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import {useHistory} from "react-router-dom";
import {Box, Table, Checkbox, VStack, HStack, Button, Heading, Loader, Alert} from "@navikt/ds-react";

import * as React from "react";
import {useTranslation} from "react-i18next";
import AuthorizationRepository from "../../api/AuthorizationRepository";
import {PencilWritingIcon} from "@navikt/aksel-icons";
import {IAlertMessage} from "../types/TableTypes";

export interface IUser {
    objectIdentifier: string,
    email: string,
    sourceApplicationIds: string[]
}

const Admin: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.admin'})
    const {isAdmin} = useContext(AuthorizationContext)
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const history = useHistory();

    if (!isAdmin) {
        history.push('/')
    }

    const [users, setUsers] = useState<IUser[] | undefined>(undefined)
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        AuthorizationRepository.getUsers()
            .then((response) => {
                setUsers(response.data)
                setError(undefined)
            })
            .catch(() => {
                setUsers([])
                setError({message: t('errorMessage')})
            })
    }, []);


    const updateUsers = () => {
        setEditMode(false)
        AuthorizationRepository.updateUsers(users ? users : [])
            .then(response => {
            setUsers(response.data)
        })
            .catch((e) => {
                console.log('error updating data, ', e)
            })
    }

    const updateUserAccess = (sub: string, sourceAppInput: string, permissionCheck: boolean) => {
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
        <PageTemplate id={'admin'} keyPrefix={'pages.admin'} customHeading>
            <HStack id={'instances-custom-header'} align={"center"} justify={"space-between"} gap={"2"} wrap={false}>
                <Heading size={"medium"}>{t('header')}</Heading>
                <Button
                    disabled={!users || editMode}
                    onClick={() => setEditMode((prevState => !prevState))}
                    size={"small"}
                    icon={<PencilWritingIcon aria-hidden/>}
                >{t('button.edit')}
                </Button>
            </HStack>
            {error && <Alert style={{maxWidth: '100%'}} variant="error">{error.message}</Alert>}
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                {users ? <VStack gap={"6"}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
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
                                            <Table.DataCell>{value.email}</Table.DataCell>
                                            {["1", "2", "3", "4"].map(sourceApp => <Table.DataCell key={`${value.objectIdentifier}-permission-${sourceApp}`}>
                                                <Checkbox
                                                    disabled={!editMode}
                                                    checked={value.sourceApplicationIds.includes(sourceApp)}
                                                    onChange={(e) => updateUserAccess(value.objectIdentifier, sourceApp, e.target.checked)}
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
                                    setUsers(users)
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
