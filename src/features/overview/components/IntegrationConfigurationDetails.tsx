import {Box, Card, Typography, Button, MenuItem, FormControl, Select, InputLabel, SelectChangeEvent, CardContent, Divider} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import IntegrationRepository from "../../integration/repository/IntegrationRepository";
import {useHistory} from "react-router-dom";
import {fieldToString} from "../../util/ValueBuilderUtil";
import {IIntegrationConfiguration} from "../../integration/types/IntegrationConfiguration";
import {ResourcesContext} from "../../../context/resourcesContext";
import {IntegrationContext} from "../../../context/integrationContext";
import {toFormData} from "../../util/ToFormData";
import {useTranslation} from "react-i18next";


const IntegrationConfigurationDetails: React.FunctionComponent<any> = (props) => {
    let history = useHistory();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationList'});
    const [activeConfiguration, setActiveConfiguration] = useState<IIntegrationConfiguration>(props.initialConfiguration)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [version, setVersion] = useState(props.initialConfiguration.version)
    const latestVersion = props.initialVersion;
    const {integration, setIntegration, setSourceApplicationId, setDestination} = useContext(IntegrationContext);
    const {setPrimaryClassification, setSecondaryClassification, setTertiaryClassification} = useContext(ResourcesContext);
    let activeFormData =  toFormData(integration)

    const versions = [];
    for (let i = 1; i<=latestVersion; i++) {
        versions.push({label: i, value: i})
    }
    const { getAllResources } = useContext(ResourcesContext);
    useEffect(()=> {
        setPrimaryClassification({label: '', value: fieldToString(integration.caseConfiguration, 'primarordningsprinsipp')})
        setSecondaryClassification({label: '', value: fieldToString(integration.caseConfiguration, 'sekundarordningsprinsipp')})
        setTertiaryClassification({label: '', value: fieldToString(integration.caseConfiguration, 'tertiarordningsprinsipp')})
        getAllResources();
    }, [])

    useEffect(()=> {
        getConfiguration(version);
    }, [version, setVersion])

    const getConfiguration = (version: any) => {
        IntegrationRepository.getByIdAndVersion(integration.sourceApplicationIntegrationId, version)
            .then((response) => {
                const configuration = response.data;
                setActiveConfiguration(configuration)
                setIntegration(configuration)
            })
            .catch(e => console.error('Error: ', e))
    }

    const updateConfiguration = (sourceApplicationIntegrationId: string, data: IIntegrationConfiguration) => {
        IntegrationRepository.update(sourceApplicationIntegrationId, data)
            .then(response => {
                console.log('updated configuration: ', sourceApplicationIntegrationId,  data, response);
                setUpdateSuccess(response.status === 200);
            })
            .catch((e: Error) => {
                console.log('error updating configuration', e);
            });
    }

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };

    const handleEdit = () => {
        history.push({
            pathname: '/integration/configuration/edit',
        })
        setIntegration(activeConfiguration);
        setSourceApplicationId(activeConfiguration?.sourceApplicationId ? activeConfiguration.sourceApplicationId : '');
        setDestination(activeConfiguration.destination ? activeConfiguration.destination : '');
    }

    const handleVersionChange = () => {
        if(activeConfiguration.sourceApplicationIntegrationId) {
            updateConfiguration(activeConfiguration.sourceApplicationIntegrationId, activeConfiguration);
        }
    }

    return (
        <>
            {!updateSuccess &&
            <Box width={950}>
                <Card sx={{mb: 4}}>
                    <FormControl size='small' sx={{float: 'right', width: 300, m: 2}}>
                        <InputLabel id="version-select-input-label">{t('revision')}</InputLabel>
                        <Select
                            labelId="version-select-label"
                            id="version-select"
                            value={version}
                            label={t('revision')}
                            onChange={handleChange}
                        >
                            {versions.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                        {version !== integration.sourceApplicationIntegrationId && <Button onClick={handleVersionChange}>{t('button.changeVersion')}</Button>}
                    </FormControl>
                    <CardContent>
                        <Typography id="details-sourceApplicationId"><strong>{t('labels.sourceApplicationId')} </strong>{activeFormData.sourceApplicationId}</Typography>
                        <Typography id="details-destination"><strong>{t('labels.destination')} </strong>{activeFormData.destination}</Typography>
                        <Typography id="details-description"><strong>{t('labels.description')}</strong>{activeFormData.description}</Typography>
                        <Typography id="details-sourceApplicationIntegrationId"><strong>{t('labels.sourceApplicationIntegrationId')}</strong>{activeFormData.sourceApplicationIntegrationId}</Typography>
                        <Typography id="details-caseConfiguration-caseCreation"><strong>{t('labels.caseCreationStrategy')}</strong>{activeFormData.caseData?.caseCreationStrategy}</Typography>
                        <Typography id="details-published"><strong>{t('labels.published')}</strong>{activeFormData.published? 'Ja' : 'Nei'}</Typography>
                        <Typography id="details-version"><strong>{t('labels.version')}</strong>{activeFormData.version}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('case')}</Typography>
                        <Typography><strong>{t('labels.caseNumber')}</strong>{activeFormData.caseData?.caseNumber}</Typography>
                        <Typography><strong>{t('labels.title')}</strong>{activeFormData.caseData?.title}</Typography>
                        <Typography><strong>{t('labels.publicTitle')}</strong>{activeFormData.caseData?.publicTitle}</Typography>
                        <Typography><strong>{t('labels.caseType')}</strong>{activeFormData.caseData?.caseType}</Typography>
                        <Typography><strong>{t('labels.administrativeUnit')}</strong>{activeFormData.caseData?.administrativeUnit}</Typography>
                        <Typography><strong>{t('labels.archiveUnit')}</strong>{activeFormData.caseData?.archiveUnit}</Typography>
                        <Typography><strong>{t('labels.recordUnit')}</strong>{activeFormData.caseData?.recordUnit}</Typography>
                        <Typography><strong>{t('labels.status')}</strong>{activeFormData.caseData?.status}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeFormData.caseData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeFormData.caseData?.paragraph}</Typography>
                        <Typography><strong>{t('labels.responsibleCaseWorker')}</strong>{activeFormData.caseData?.caseWorker}</Typography>
                        <Typography><strong>{t('labels.primaryClassification')}</strong>{activeFormData.caseData?.primaryClassification}</Typography>
                        <Typography><strong>{t('labels.primaryClass')}</strong>{activeFormData.caseData?.primaryClass}</Typography>
                        <Typography><strong>{t('labels.primaryTitle')}</strong>{activeFormData.caseData?.primaryTitle}</Typography>
                        <Typography><strong>{t('labels.secondaryClassification')}</strong>{activeFormData.caseData?.secondaryClassification}</Typography>
                        <Typography><strong>{t('labels.secondaryClass')}</strong>{activeFormData.caseData?.secondaryClass}</Typography>
                        <Typography><strong>{t('labels.secondaryTitle')}</strong>{activeFormData.caseData?.secondaryTitle}</Typography>
                        <Typography><strong>{t('labels.tertiaryClassification')}</strong>{activeFormData.caseData?.tertiaryClassification}</Typography>
                        <Typography><strong>{t('labels.tertiaryClass')}</strong>{activeFormData.caseData?.tertiaryClass}</Typography>
                        <Typography><strong>{t('labels.tertiaryTitle')}</strong>{activeFormData.caseData?.tertiaryTitle}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('record')}</Typography>
                        <Typography><strong>{t('labels.title')}</strong>{activeFormData.recordData?.title}</Typography>
                        <Typography><strong>{t('labels.publicTitle')}</strong>{activeFormData.recordData?.publicTitle}</Typography>
                        <Typography><strong>{t('labels.recordType')}</strong>{activeFormData.recordData?.recordType}</Typography>
                        <Typography><strong>{t('labels.documentType')}</strong>{activeFormData.recordData?.documentType}</Typography>
                        <Typography><strong>{t('labels.administrativeUnit')}</strong>{activeFormData.recordData?.administrativeUnit}</Typography>
                        <Typography><strong>{t('labels.recordStatus')}</strong>{activeFormData.recordData?.recordStatus}</Typography>
                        <Typography><strong>{t('labels.caseWorker')}</strong>{activeFormData.recordData?.caseWorker}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeFormData.recordData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeFormData.recordData?.paragraph}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('document')}</Typography>
                        <Typography><strong>{t('labels.title')}</strong>{activeFormData.documentData?.title}</Typography>
                        <Typography><strong>{t('labels.documentStatus')}</strong>{activeFormData.documentData?.documentStatus}</Typography>
                        <Typography><strong>{t('labels.documentCategory')}</strong>{activeFormData.documentData?.documentCategory}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeFormData.documentData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeFormData.documentData?.paragraph}</Typography>
                        <Typography><strong>{t('labels.variant')}</strong>{activeFormData.documentData?.variant}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>{t('applicant')}</Typography>
                        <Typography><strong>{t('labels.organisationNumber')}</strong>{activeFormData.applicantData?.organisationNumber}</Typography>
                        <Typography><strong>{t('labels.nationalIdentityNumber')}</strong>{activeFormData.applicantData?.nationalIdentityNumber}</Typography>
                        <Typography><strong>{t('labels.applicantName')}</strong>{activeFormData.applicantData?.name}</Typography>
                        <Typography><strong>{t('labels.address')}</strong>{activeFormData.applicantData?.address}</Typography>
                        <Typography><strong>{t('labels.postalCode')}</strong>{activeFormData.applicantData?.postalCode}</Typography>
                        <Typography><strong>{t('labels.city')}</strong>{activeFormData.applicantData?.city}</Typography>
                        <Typography><strong>{t('labels.contactPerson')}</strong>{activeFormData.applicantData?.contactPerson}</Typography>
                        <Typography><strong>{t('labels.phoneNumber')}</strong>{activeFormData.applicantData?.phoneNumber}</Typography>
                        <Typography><strong>{t('labels.email')}</strong>{activeFormData.applicantData?.email}</Typography>
                        <Typography><strong>{t('labels.accessCode')}</strong>{activeFormData.applicantData?.accessCode}</Typography>
                        <Typography><strong>{t('labels.paragraph')}</strong>{activeFormData.applicantData?.paragraph}</Typography>
                        <Typography><strong>{t('labels.protected')}</strong>{activeFormData.applicantData?.protected ? 'Ja' : 'Nei'}</Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" onClick={props.reset}>{t('button.back')}</Button>
                <Button sx={{float: 'right'}} variant="contained" onClick={handleEdit}>{t('button.edit')}</Button>
            </Box>
            }
            {updateSuccess &&
            <Box>
                <Typography>{t('changedMsg')} {activeConfiguration.version}</Typography>
                <Button variant="contained" onClick={props.reset}>{t('button.back')}</Button>
            </Box>
            }

        </>
    );
}

export default IntegrationConfigurationDetails;
