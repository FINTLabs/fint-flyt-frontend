import {Box, Card, CardContent, Theme} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import {IntegrationContext} from "../../context/integrationContext";
import IntegrationTable from "../integrationOverview/components/IntegrationTable";
import DashboardCard from "./DashboardCard";
import {ICard} from "./types/Card";
import {useTranslation} from "react-i18next";
import {newToFormData} from "../util/mapping/ToFormData";
import {MOCK_NEW_CONFIG} from "../../__tests__/mock/mock-configuration";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 1px',
            marginRight: theme.spacing(2),
            borderColor: theme.palette.primary.main
        },
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridContainer: {
            marginTop: theme.spacing(4)
        },
        dataGridBox: {
            minHeight: '400px',
            maxHeight: '2500px',
            width: '100%'
        }
    }));

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.dashboard'});
    const classes = useStyles();
    const {setNewIntegration, newIntegrations, getNewIntegrations} = useContext(IntegrationContext)

    useEffect(()=> {
        getNewIntegrations();
    }, [])

    console.log(newToFormData(MOCK_NEW_CONFIG))

    const cards: ICard[] = [
        { value: newIntegrations.length === 0 ? t('empty') : newIntegrations.length, content: t('form'), links: [
                {name: t('links.newIntegration'), href: '/integration/configuration/new'}
            ]
        },
        { value: t('empty'), content: t('errors'), links: [
                {name: t('links.log'), href: '/log'}
            ]
        }
    ]

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                {cards.map((card: ICard, index) => {
                    return (
                        <DashboardCard
                            key={index}
                            id={`dashboard-card-` + index}
                            value={card.value}
                            content={card.content}
                            links={card.links}
                            classes={classes}
                        />)
                })}
            </Box>
            <Card className={classes.card} sx={{mt: 4}}>
                <CardContent>
                        <IntegrationTable
                            classes={classes}
                            loading={newIntegrations.length === 0}
                            integrations={newIntegrations}
                            setIntegration={setNewIntegration}
                        />
                </CardContent>
            </Card>
        </Box>
    );
}

export default withRouter(Dashboard);
