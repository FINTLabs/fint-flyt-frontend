import {Theme, Typography} from '@mui/material';
import React  from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import InstanceTable from "./components/InstanceTable";
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: "750px",
            width: '100%'
        }
    })
);

const InstanceOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instanceOverview'});
    const classes = useStyles();

    return (
        <>
            <Typography>{t('header')}</Typography>
            <InstanceTable
                classes={classes}
            />
        </>
    );
}

export default withRouter(InstanceOverview);
