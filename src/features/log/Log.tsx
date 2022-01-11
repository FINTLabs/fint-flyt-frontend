import React from 'react';
import { withRouter } from 'react-router-dom';
import {Chip, Typography} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Details from "./Details";

function createData(
    time: string,
    title: string,
    name: string,
    status: string,
    version: number
) {
    return {
        status,
        time,
        name,
        title,
        version,
        history: [
            {
                date: '2020-01-05 22:02:23',
                action: 'lagring til arkiv',
                service: 'CaseService',
                status: 'feilet',
                errorMsg: 'vis'
            },
            {
                date: '2020-01-02 22:01:00',
                action: 'overføring til arkiv',
                service: 'ServiceController',
                status: 'ok',
                errorMsg: '-'
            },
            {
                date: '2020-01-02 21:59:23',
                action: 'opprette konfigurasjon',
                service: 'FormIntegration',
                status: 'ok',
                errorMsg: '-'
            },
        ]
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Chip variant="outlined"
                          icon={row.status == 'ok'? <CheckCircleOutlineIcon/> : <ErrorOutlineIcon/>}
                          color={row.status == 'ok'? 'success' : 'error'}
                          label={row.status}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.time}
                </TableCell>
                <TableCell>{row.name}
                </TableCell>
                <TableCell>
                    {row.title}
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Details row={row}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('2020-12-21', 'TT-kort John Doe ', 'Søknad of TT-kort' , 'ok', 1),
    createData('2020-12-05', 'TT-kort Wb.Samson', 'Søknad of TT-kort', 'ok', 2),
    createData('2020-10-24', 'Søknad om tillatelse for kyllingoppdrett - Mikkel Rev', 'Søknad om dyrehold', 'feilet',4),
    createData('2020-08-05', 'Busskortsøknad for Urban Ugle', 'Søknad om skoleskyss', 'ok',1),
    createData('2020-07-25', 'Søknad om fellingstillatelse - S. Heep', 'Fellingssøknad - rovdyr', 'ok',2),
    createData('2020-07-05', 'loremskjema - Rand Althor', 'Søknad om tillatelse for Lorem Ipsum', 'feilet',1),
    createData('2020-07-05', 'ipsumsøknad - Jane Doe', 'Søknad om tillatelse for Lorem Ipsum', 'ok',4),
    createData('2020-12-21', 'TT-kort Robert Jordan', 'Søknad of TT-kort' , 'ok', 1),
];

function Log() {
    return (
        <TableContainer component={Paper}>
            <Typography variant={"h5"} sx={{m: 3}}>Logg</Typography>
            <Table aria-label="collapsible table" size="small">
                <TableHead>
                    <TableRow sx={{ '& > *': { fontWeight: 'bold' } }}>
                        <TableCell>Status</TableCell>
                        <TableCell>Tidspunkt</TableCell>
                        <TableCell>Navn</TableCell>
                        <TableCell>Tittel</TableCell>
                        <TableCell>Detaljer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.title} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default withRouter(Log);