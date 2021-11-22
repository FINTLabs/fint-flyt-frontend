import {Box, Button, Card, CardActions, CardContent, Theme, Typography} from '@mui/material';
import React, {useContext} from 'react';
import { RouteComponentProps, withRouter, Link as RouterLink } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import {AppContext} from "../../App";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 2px',
            marginRight: theme.spacing(2),
            borderColor: theme.palette.primary.main
        }
    }));

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const context = useContext(AppContext);
    const classes = useStyles();

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {context.numberOfIntegrations} Skjema
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" component={RouterLink} to="/overview">Se integrasjoner</Button>
                    <Button size="small" variant="outlined" component={RouterLink} to="/integration_configuration">Ny integrasjon</Button>
                </CardActions>
            </Card>
            <Card className={classes.card} sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {context.numberOfErrors} Feilmeldinger
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" component={RouterLink} to="/log">Se logg</Button>
                    <Button size="small" variant="outlined" component={RouterLink} to="/support">Opprett supportsak</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default withRouter(Dashboard);