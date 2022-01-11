import React from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
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
import EditIcon from '@mui/icons-material/Edit';
import Details from "./Details";

function createData(
    time: string,
    name: string,
    id: string,
    status: string,
    version: number
) {
    return {
        status,
        time,
        name,
        id,
        version,
        history: [
            {
                date: '2020-01-05 22:02:23',
                service: 'lagring til arkiv',
                status: 'feilet',
            },
            {
                date: '2020-01-02 22:01:00',
                service: 'overføring til arkiv',
                status: 'ok',
            },
            {
                date: '2020-01-02 21:59:23',
                service: 'opprette konfigurasjon',
                status: 'ok',
            },
        ],
        links: [
            {
                name: 'Rediger',
                value: '/integration/configuration/new',
                external: false
            },
            {
                name: 'Åpne i arkivsystem',
                value: '/',
                external: true
            },
            {
                name: 'Åpne i skjemasystem',
                value: '/',
                external: true
            },
            {
                name: 'Rediger i skjemaeditor',
                value: '/',
                external: true
            },
        ],
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
                <TableCell>{row.name}</TableCell>
                <TableCell>
                    {row.id}
                    <IconButton size='small' component={RouterLink} target="_blank" to={"/integration/configuration/new"}> <EditIcon fontSize="small"/></IconButton>
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
    createData('2020-12-21', 'TT-kort John Doe ', 'fser24-72hs-ef2' , 'ok', 1),
    createData('2020-12-05', 'Søknadskjema for Navn Navnesen', '94igu-94hv-0os', 'ok', 2),
    createData('2020-11-2', 'Skjemaskjema', '0dowh-92ud-9rg', 'ok',2),
    createData('2020-10-24', 'Søknad om tillatelse for kyllingoppdrett - Mikkel Rev', 'fth24-1f3r-op3', 'feilet',4),
    createData('2020-08-05', 'UU-søknad for Urban Ugle', '2fr24-498f-er3', 'ok',1),
    createData('2020-07-25', 'Søknad om tillatese - Ulv Fåreklær', '6usfg-w45g-g54', 'ok',2),
    createData('2020-07-05', 'loremskjema - Rand Althor', '34fes-gs4f-j6e', 'feilet',1),
    createData('2020-07-05', 'ipsumsøknad - Jane Doe', 'kl87f-rgrs-l8t', 'ok',4),
    createData('2020-12-21', 'TT-kort Robert Jordan', 'lej57-48uf-32q' , 'ok', 1),



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
                        <TableCell>id</TableCell>
                        <TableCell>Detaljer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default withRouter(Log);