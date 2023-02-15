import {Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayName
} from "../../defaults/DefaultValues";
import { useTranslation } from 'react-i18next';
import ResourceRepository from "../../../../shared/repositories/ResourceRepository";
import {IntegrationContext} from "../../../../context/integrationContext";

const CaseInformation: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.caseInformation'});
    const [_case, setCase] = React.useState('');
    const {setId, selectedMetadata} = useContext(IntegrationContext)
    let caseInput = props.watch("caseData.id");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,6})/g;

    useEffect(() => {
        if(caseInput) {
            handleCaseSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCaseSearch = () => {
        if(caseInputPattern.test(caseInput)) {
            setId(caseInput)
            setCase(t('caseSearch.searching'))
            let caseId = caseInput.split('/')
            ResourceRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(caseInput +': ' + response.data.value)
                    setId(caseInput)
                })
                .catch(e => {
                        console.error('Error: ', e)
                    setId(undefined)
                        setCase(caseInput +': ' + t('caseSearch.noMatch'));
                        props.setValue("caseData.newCase.id", undefined)
                    }
                )
        } else {
            setCase(t('caseSearch.info'))
            setId(undefined)
        }
    }

    return (
        <div>
            <Typography><strong>{t('integrationId')}: </strong>{props.integration?.id}</Typography>
            <Typography><strong>{t('sourceApplicationId')}: </strong>{getSourceApplicationDisplayName(props.integration?.sourceApplicationId)}</Typography>
            <Typography><strong>{t('sourceApplicationIntegrationId')}: </strong>{props.integration?.sourceApplicationIntegrationId} - {selectedMetadata.integrationDisplayName}</Typography>
            <Typography><strong>{t('destination')}: </strong>{getDestinationDisplayName(props.integration?.destination)}</Typography>
        </div>
    );
}

export default CaseInformation;
