import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ValueConvertingTable from "./components/ValueConvertingTable";
import ValueConvertingForm from "./components/ValueConvertingForm";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";
import {RouteComponent} from "../main/Route";
import {Box, Heading, HStack} from "@navikt/ds-react";
import HelpPopover from "../configuration/components/common/popover/HelpPopover";


const ValueConverting: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false)
    return (
        <Box paddingInline={"32"}>
            {existingValueConverting || newValueConverting ?
                <Box>
                    <HStack>
                        <Heading size={"medium"} id="value-converting-panel-header" spacing>{t('newHeader')}</Heading>
                        <HelpPopover popoverContent={''} noMargin={true}/>
                    </HStack>
                    <ValueConvertingForm
                        existingValueConverting={existingValueConverting ?? undefined}
                        setNewValueConverting={setNewValueConverting}
                        setExistingValueConverting={setExistingValueConverting}
                    />
                </Box>

                :
                <Box>
                    <Heading size={"medium"} id="value-converting-panel-header" spacing>{t('panelHeader')}</Heading>
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
                </Box>
            }
        </Box>
    );
}

export default ValueConverting;