import {Box, Button, Card, CardActions, CardContent, CardMedia, Theme, Typography} from '@mui/material';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 2px',
            marginRight: theme.spacing(2),
            borderColor: theme.palette.primary.main
        }
    }));

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const numberOfIntegrations= 17;
    const numberOfErrors= 3;
    const classes = useStyles();

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {numberOfIntegrations} Skjema
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined">Se integrasjoner</Button>
                    <Button size="small" variant="outlined">Ny integrasjon</Button>
                </CardActions>
            </Card>
            <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {numberOfErrors} Feilmeldinger
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined">Se logg</Button>
                    <Button size="small" variant="outlined">Opprett supportsak</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default withRouter(Dashboard);