import {Box, Card, Typography, Button, CardContent, Divider} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {configurationFieldToString} from "../../util/MappingUtil";
import {ResourcesContext} from "../../../context/resourcesContext";
import {IntegrationContext} from "../../../context/integrationContext";
import {newToFormData} from "../../util/mapping/ToFormData";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {SOURCE_FORM_NO_VALUES} from "../../integration/defaults/DefaultValues";
import {IFormConfiguration} from "../../integration/types/Form/FormData";
import {newIConfiguration} from "../../integration/types/Configuration";


const IntegrationConfigurationDetails: React.FunctionComponent<any> = (props) => {
    let history = useHistory();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const {newIntegration, configuration, setConfiguration, setSelectedForm} = useContext(IntegrationContext);
    const {setPrimaryClassification, setSecondaryClassification, setTertiaryClassification} = useContext(ResourcesContext);
    let activeConfigData: IFormConfiguration = newToFormData(configuration)
    const [activeConfiguration, setActiveConfiguration] = useState<newIConfiguration>(configuration)
    const cases = configuration.elements?.filter(cf => cf.key === 'case');
    const {getAvailableForms, metadata, getMetadata} = useContext(SourceApplicationContext)

    const { getAllResources } = useContext(ResourcesContext);
    useEffect(()=> {
        getAvailableForms();
        getMetadata();
        setPrimaryClassification({label: '', value: configurationFieldToString(cases, 'primarordningsprinsipp')})
        setSecondaryClassification({label: '', value: configurationFieldToString(cases, 'sekundarordningsprinsipp')})
        setTertiaryClassification({label: '', value: configurationFieldToString(cases, 'tertiarordningsprinsipp')})
        getAllResources();
    }, [])


    const handleEdit = () => {
        history.push({
            pathname: '/integration/configuration/edit',
        })
        let selectedForm = metadata.filter(md => md.sourceApplicationIntegrationId === newIntegration?.sourceApplicationIntegrationId)
        //TODO: remove when we can no longer use old forms
        setSelectedForm(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
        setConfiguration(activeConfiguration);
    }


    return (
        <>
            <Box width={950}>
                <Card sx={{mb: 4}}>
                    <CardContent>
                        <Typography id="details-sourceApplicationId"><strong>{t('labels.sourceApplicationId')} </strong>{newIntegration?.sourceApplicationId}</Typography>
                        <Typography id="details-destination"><strong>{t('labels.destination')} </strong>{newIntegration?.destination}</Typography>
                        <Typography id="details-comment"><strong>{t('labels.comment')}</strong>{activeConfigData?.comment}</Typography>
                        <Typography id="details-sourceApplicationIntegrationId"><strong>{t('labels.sourceApplicationIntegrationId')}</strong>{newIntegration?.sourceApplicationIntegrationId}</Typography>
                        <Typography id="details-caseConfiguration-caseCreation"><strong>{t('labels.caseCreationStrategy')}</strong>{activeConfigData.caseData?.caseCreationStrategy}</Typography>
                        <Typography id="details-finished"><strong>{t('labels.finished')}</strong>{activeConfigData.completed? 'Ja' : 'Nei'}</Typography>
                        <Typography id="details-version"><strong>{t('labels.version')}</strong>{activeConfigData.version}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('case')}</Typography>
                        <Typography><strong>{t('labels.caseNumber')}</strong>{activeConfigData.caseData?.caseNumber}</Typography>
                        <Typography><strong>{t('labels.title')}</strong>{activeConfigData.caseData?.title}</Typography>
                        <Typography><strong>{t('labels.publicTitle')}</strong>{activeConfigData.caseData?.publicTitle}</Typography>
                        <Typography><strong>{t('labels.caseType')}</strong>{activeConfigData.caseData?.caseType}</Typography>
                        <Typography><strong>{t('labels.administrativeUnit')}</strong>{activeConfigData.caseData?.administrativeUnit}</Typography>
                        <Typography><strong>{t('labels.archiveUnit')}</strong>{activeConfigData.caseData?.archiveUnit}</Typography>
                        <Typography><strong>{t('labels.recordUnit')}</strong>{activeConfigData.caseData?.recordUnit}</Typography>
                        <Typography><strong>{t('labels.status')}</strong>{activeConfigData.caseData?.status}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeConfigData.caseData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeConfigData.caseData?.paragraph}</Typography>
                        <Typography><strong>{t('labels.responsibleCaseWorker')}</strong>{activeConfigData.caseData?.caseWorker}</Typography>
                        <Typography><strong>{t('labels.primaryClassification')}</strong>{activeConfigData.caseData?.primaryClassification}</Typography>
                        <Typography><strong>{t('labels.primaryClass')}</strong>{activeConfigData.caseData?.primaryClass}</Typography>
                        <Typography><strong>{t('labels.primaryTitle')}</strong>{activeConfigData.caseData?.primaryTitle}</Typography>
                        <Typography><strong>{t('labels.secondaryClassification')}</strong>{activeConfigData.caseData?.secondaryClassification}</Typography>
                        <Typography><strong>{t('labels.secondaryClass')}</strong>{activeConfigData.caseData?.secondaryClass}</Typography>
                        <Typography><strong>{t('labels.secondaryTitle')}</strong>{activeConfigData.caseData?.secondaryTitle}</Typography>
                        <Typography><strong>{t('labels.tertiaryClassification')}</strong>{activeConfigData.caseData?.tertiaryClassification}</Typography>
                        <Typography><strong>{t('labels.tertiaryClass')}</strong>{activeConfigData.caseData?.tertiaryClass}</Typography>
                        <Typography><strong>{t('labels.tertiaryTitle')}</strong>{activeConfigData.caseData?.tertiaryTitle}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('record')}</Typography>
                        <Typography><strong>{t('labels.title')}</strong>{activeConfigData.recordData?.title}</Typography>
                        <Typography><strong>{t('labels.publicTitle')}</strong>{activeConfigData.recordData?.publicTitle}</Typography>
                        <Typography><strong>{t('labels.recordType')}</strong>{activeConfigData.recordData?.recordType}</Typography>
                        <Typography><strong>{t('labels.documentType')}</strong>{activeConfigData.recordData?.documentType}</Typography>
                        <Typography><strong>{t('labels.administrativeUnit')}</strong>{activeConfigData.recordData?.administrativeUnit}</Typography>
                        <Typography><strong>{t('labels.recordStatus')}</strong>{activeConfigData.recordData?.recordStatus}</Typography>
                        <Typography><strong>{t('labels.caseWorker')}</strong>{activeConfigData.recordData?.caseWorker}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeConfigData.recordData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeConfigData.recordData?.paragraph}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('document')}</Typography>
                        <Typography><strong>{t('labels.title')}</strong>{activeConfigData.documentData?.title}</Typography>
                        <Typography><strong>{t('labels.documentStatus')}</strong>{activeConfigData.documentData?.documentStatus}</Typography>
                        <Typography><strong>{t('labels.documentCategory')}</strong>{activeConfigData.documentData?.documentCategory}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeConfigData.documentData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeConfigData.documentData?.paragraph}</Typography>
                        <Typography><strong>{t('labels.variant')}</strong>{activeConfigData.documentData?.variant}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('applicant')}</Typography>
                        <Typography><strong>{t('labels.organisationNumber')}</strong>{activeConfigData.applicantData?.organisationNumber}</Typography>
                        <Typography><strong>{t('labels.nationalIdentityNumber')}</strong>{activeConfigData.applicantData?.nationalIdentityNumber}</Typography>
                        <Typography><strong>{t('labels.applicantName')}</strong>{activeConfigData.applicantData?.name}</Typography>
                        <Typography><strong>{t('labels.address')}</strong>{activeConfigData.applicantData?.address}</Typography>
                        <Typography><strong>{t('labels.postalCode')}</strong>{activeConfigData.applicantData?.postalCode}</Typography>
                        <Typography><strong>{t('labels.city')}</strong>{activeConfigData.applicantData?.city}</Typography>
                        <Typography><strong>{t('labels.contactPerson')}</strong>{activeConfigData.applicantData?.contactPerson}</Typography>
                        <Typography><strong>{t('labels.phoneNumber')}</strong>{activeConfigData.applicantData?.phoneNumber}</Typography>
                        <Typography><strong>{t('labels.email')}</strong>{activeConfigData.applicantData?.email}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeConfigData.applicantData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeConfigData.applicantData?.paragraph}</Typography>
                        <Typography><strong>{t('labels.protected')}</strong>{activeConfigData.applicantData?.protected ? 'Ja' : 'Nei'}</Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" onClick={props.reset}>{t('button.back')}</Button>
                <Button sx={{float: 'right'}} variant="contained" onClick={handleEdit}>{t('button.edit')}</Button>
            </Box>


        </>
    );
}

export default IntegrationConfigurationDetails;
