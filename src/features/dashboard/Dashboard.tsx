import {Box, Button, Card, CardActions, CardContent, FormControl, TextField, Theme, Typography} from '@mui/material';
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
    const [caseInput, setCaseInput] = React.useState('');
    const [helperText, setHelperText] = React.useState('');
    const handleCaseInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaseInput(event.target.value);
    };
    let caseInputPattern = /^((19|20)\d{2})\/([0-9]{1,6})/g;


    function handleClick() {
        if(caseInputPattern.test(caseInput)) {
            setHelperText('');
            let caseId = caseInput.split('/')
            IntegrationRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
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
        } else setHelperText('Saksnummer må være på formatet 2021/03')
    }


    return (
        <Box flexDirection={"row"} position="relative" width={1} height={1}>
            <Box
                component="form"
                sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
                autoComplete="off"
            >
                <FormControl>
                    <TextField
                        id="outlined-name"
                        label="Saksnummer"
                        value={caseInput}
                        onChange={handleCaseInputChange}
                        helperText={helperText}
                    />
                    <Button onClick={handleClick}>Click</Button>
                </FormControl>
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