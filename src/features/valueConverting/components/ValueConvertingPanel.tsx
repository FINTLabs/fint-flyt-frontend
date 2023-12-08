import React, {useEffect, useState} from 'react';
import {IValueConverting} from "../types/ValueConverting";
import getSelectables from "../../configuration/util/SelectablesUtils";
import {ISelectable} from "../../configuration/types/Selectable";
import {Box, Heading, Table} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

type Props = {
    existingValueConverting: IValueConverting | undefined,
}

export const ValueConvertingPanel: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [toSelectables, setToSelectables] = useState<ISelectable[]>([])

    useEffect(() => {
        getSelectables([{
            url: "api/intern/arkiv/kodeverk/format"
        }])
            .then((result: ISelectable[]) => {
                setToSelectables(result);
            })
    }, [])

    const findDisplayName = (valueToFind: string) => {
        const selectedItem = toSelectables.find(item => item.value === valueToFind);
        return selectedItem ? selectedItem.displayName : valueToFind;
    };

    return (
        <Box id={"value-converting-panel"} padding="3" background={"surface-subtle"} borderRadius="large">
            <Heading id={"value-converting-panel-heading"} size={"xsmall"} spacing>{t('convertingMap')}</Heading>
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">{t('from')}</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{t('to')}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {Object.entries(props.existingValueConverting?.convertingMap ?? {}).map(([key, value], i) => {
                            return (
                                <Table.Row key={i}>
                                    <Table.DataCell>{key}</Table.DataCell>
                                    <Table.DataCell>{findDisplayName(value)}</Table.DataCell>
                                </Table.Row>
                            )
                        }
                    )}
                </Table.Body>
            </Table>
        </Box>
    );
}

export default ValueConvertingPanel;