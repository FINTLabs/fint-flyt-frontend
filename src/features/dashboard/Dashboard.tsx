import {Box, Button, Card, CardActions, CardContent, TextField, Theme, Typography} from '@mui/material';
import React from 'react';
import { RouteComponentProps, withRouter, Link as RouterLink } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 2px',
            marginRight: theme.spacing(2),
            borderColor: theme.palette.primary.main
        }
    }));

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    const [_case, setCase] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [caseYear, setCaseYear] = React.useState('');
    const [caseNumber, setCaseNumber] = React.useState('');
    let res: any;
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaseYear(event.target.value);
    };
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaseNumber(event.target.value);
    };

    function handleClick() {
        IntegrationRepository.getSak(caseYear, caseNumber)
            .then((response) => {
                res = response;
                setCase(response.data)
                setStatus(', status ' + response.statusText)
                console.log(response)
            })
            .catch(e => {
                console.error('Error: ', e)
                setCase('Ikke funnet');
                setStatus('404')
            }
        )
    }

    return (
        <Box flexDirection={"row"} position="relative" width={1} height={1}>
            <Box
                component="form"
                sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-name"
                    label="Year"
                    value={caseYear}
                    onChange={handleYearChange}
                />
                <TextField
                    id="outlined-name"
                    label="Casenumber"
                    value={caseNumber}
                    onChange={handleNumberChange}
                />
                <Button onClick={handleClick}>Click</Button>
                {_case} {status}
            </Box>
            <Box display="flex" sx={{mt: 5}}>
                <Card className={classes.card} sx={{ maxWidth: 345}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            5 Skjema
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="outlined" component={RouterLink} to="/overview">Se integrasjoner</Button>
                        <Button size="small" variant="outlined" component={RouterLink} to="/integration/configuration/new">Ny integrasjon</Button>
                    </CardActions>
                </Card>
                <Card className={classes.card} sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            17 Feilmeldinger
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="outlined" component={RouterLink} to="/log">Se feillogg</Button>
                        <Button size="small" variant="outlined" component={RouterLink} to="/support">Opprett supportsak</Button>
                    </CardActions>
                </Card>
            </Box>
        </Box>
    );
}

export default withRouter(Dashboard);