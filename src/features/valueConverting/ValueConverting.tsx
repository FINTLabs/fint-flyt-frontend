import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ValueConvertingTable from "./components/ValueConvertingTable";
import ValueConvertingForm from "./components/ValueConvertingForm";
import ValueConvertingRepository from "../../shared/repositories/ValueConvertingRepository";
import {RouteComponent} from "../main/Route";
import {Box, Heading} from "@navikt/ds-react";


const ValueConverting: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false)
    const [view, setView] = useState<boolean>(false);
    return (
        <Box paddingInline={"32"}>
            {existingValueConverting ?
                <ValueConvertingForm existingValueConverting={existingValueConverting}
                                     setNewValueConverting={setNewValueConverting}
                                     setExistingValueConverting={setExistingValueConverting}
                                     view={view}
                />
                :
                newValueConverting ?
                    <ValueConvertingForm setNewValueConverting={setNewValueConverting}
                                         existingValueConverting={undefined}
                                         setExistingValueConverting={setExistingValueConverting} view={false}/>
                    :
                    <Box>
                        <Heading size={"medium"} id="value-converting-panel-header" spacing>{t('panelHeader')}</Heading>
                        <ValueConvertingTable
                            setNewValueConverting={setNewValueConverting}
                            onValueConvertingSelected={(id: number, view: boolean) => {
                                return ValueConvertingRepository.getValueConverting(id)
                                    .then(response => {
                                        setView(view)
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