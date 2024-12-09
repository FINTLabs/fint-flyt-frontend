import React, {useContext, useEffect, useState} from 'react';
import PageTemplate from "../../components/templates/PageTemplate";
import ValueConvertingForm from "../../features/valueConverting/components/ValueConvertingForm";
import {RouteComponent} from "../../routes/Route";
import ValueConvertingTable from "../../features/valueConverting/components/ValueConvertingTable";
import ValueConvertingRepository from "../../api/ValueConvertingRepository";
import {Button, Heading, HelpText, HStack} from "@navikt/ds-react";
import {PlusIcon} from "@navikt/aksel-icons";
import {useTranslation} from "react-i18next";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import {useNavigate} from "react-router-dom";

const ValueConverting: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'})
    const [existingValueConverting, setExistingValueConverting] = useState(undefined);
    const [newValueConverting, setNewValueConverting] = useState<boolean>(false)
    const { authorized, getAuthorization} = useContext(AuthorizationContext)
    const history = useNavigate();

    if(!authorized) {
        history('/forbidden')
    }
    useEffect(() => {
        getAuthorization()
    }, []);

    return (
        <PageTemplate id={'valueConverting'} keyPrefix={'pages.valueConverting'} customHeading>
            <HStack id={'instances-custom-header'} align={"center"} justify={"space-between"} gap={"2"} wrap={false}>
                <HStack align={"center"} gap={"2"}>
                    <Heading size={"medium"}>{t('header')}</Heading>
                </HStack>
                {!existingValueConverting && !newValueConverting &&
                    <HStack gap={"2"} align="center">
                        <Button
                            id={"new-button"}
                            onClick={() => setNewValueConverting(true)}
                            size={"small"}
                            icon={<PlusIcon aria-hidden/>}
                        >{t('button.newConverting')}
                        </Button>
                        <HelpText title="Knapp informasjon" placement="left">
                            {t('help.new')}
                        </HelpText>
                    </HStack>
                }
            </HStack>
            {existingValueConverting || newValueConverting ?
                <ValueConvertingForm
                    existingValueConverting={existingValueConverting ?? undefined}
                    setNewValueConverting={setNewValueConverting}
                    setExistingValueConverting={setExistingValueConverting}
                />
                :
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
            }
        </PageTemplate>
    );
}

export default ValueConverting;