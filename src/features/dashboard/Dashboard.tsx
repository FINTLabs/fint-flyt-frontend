import {Box, Button, Card, CardActions, CardContent, Theme, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { RouteComponentProps, withRouter, Link as RouterLink } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 1px',
            marginRight: theme.spacing(2),
            borderColor: theme.palette.primary.main
        }
    }));

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.dashboard'});
    const classes = useStyles();
    const [numberOfIntegrations, setNumberOfIntegrations] = useState(0);

    useEffect(()=> {
        IntegrationRepository.get()
            .then(response => {
                let data = response.data.numberOfElements;
                setNumberOfIntegrations(data);
            })
            .catch((e: Error) => {
                console.log('error fetching configurations', e)
            })
    })

    return (
    <Box display="flex" position="relative" width={1} height={1}>
        <Card className={classes.card} sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {numberOfIntegrations == 0 ? t('empty') : numberOfIntegrations} {t('form')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" component={RouterLink} to="/overview">{t('links.integrationList')}</Button>
                <Button size="small" variant="outlined" component={RouterLink} to="/integration/configuration/new">{t('links.newIntegration')}</Button>
            </CardActions>
        </Card>
        <Card className={classes.card} sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {t('empty')} {t('errors')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" component={RouterLink} to="/log">{t('links.log')}</Button>
                <Button size="small" variant="outlined" component={RouterLink} to="/support">{t('links.support')}</Button>
            </CardActions>
        </Card>
    </Box>
);
}

export default withRouter(Dashboard);