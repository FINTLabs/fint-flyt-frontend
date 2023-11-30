import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ValueConvertingTable from "./components/ValueConvertingTable";
import ValueConvertingForm from "./components/ValueConvertingForm";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";
import {RouteComponent} from "../main/Route";
import {Box, Heading, HelpText, HStack, VStack} from "@navikt/ds-react";


const ValueConverting: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false)
    return (
        <Box paddingInline={"32"}>
            {existingValueConverting || newValueConverting ?
                <VStack gap={"6"}>
                    <Heading size={"medium"} id="value-converting-panel-header">{t('newHeader')}</Heading>
                    <ValueConvertingForm
                        existingValueConverting={existingValueConverting ?? undefined}
                        setNewValueConverting={setNewValueConverting}
                        setExistingValueConverting={setExistingValueConverting}
                    />
                </VStack>
                :
                <VStack gap={"6"}>
                    <HStack gap={"2"} align="center">
                        <Heading size={"medium"} id="value-converting-panel-header">{t('panelHeader')}</Heading>
                        <HelpText title="Verdikonverteringer informasjon" placement="bottom">
                            {t('help.valueConverting')}
                        </HelpText>
                    </HStack>
                    <ValueConvertingTable
                        setNewValueConverting={setNewValueConverting}
                        onValueConvertingSelected={(id: number) => {
                            return ValueConvertingRepository.getValueConverting(id)
                                .then(response => {
                                    setExistingValueConverting(response.data);
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        }
                        }/>
                </VStack>
            }
        </Box>
    );
}

export default ValueConverting;