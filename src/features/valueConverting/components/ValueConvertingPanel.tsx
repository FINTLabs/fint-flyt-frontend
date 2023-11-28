import React, {useEffect, useState} from 'react';
import {IValueConverting} from "../types/ValueConverting";
import getSelectables from "../../configuration/util/SelectablesUtils";
import {ISelectable} from "../../configuration/types/Selectable";
import {BodyShort, Box, Heading, HStack, Label, Tooltip, VStack} from "@navikt/ds-react";
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
        <Box padding="4" background={"surface-subtle"} borderRadius="xlarge">
            <Heading size={"xsmall"} spacing>{t('convertingMap')}</Heading>
            <HStack gap="32" wrap={false}>
                <VStack>
                    <Label>{t('from')}</Label>
                    {Object.keys(props.existingValueConverting?.convertingMap ?? {}).map((key) => (
                        <BodyShort key={key}>{key}</BodyShort>))}
                </VStack>
                <VStack>
                    <Label>{t('to')}</Label>
                    {Object.values(props.existingValueConverting?.convertingMap ?? {}).map((value) => (
                        <Tooltip key={value} content={value} placement="right">
                            <BodyShort>{findDisplayName(value)}</BodyShort>
                        </Tooltip>))}
                </VStack>
            </HStack>
        </Box>
    );
}

export default ValueConvertingPanel;