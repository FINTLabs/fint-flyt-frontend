import React from 'react';
import { withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";
import Box from '@mui/material/Box';
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

function createData(
    time: string,
    name: string,
    id: string,
    extId: string,
    version: number,
    status: string,
) {
    return {
        time,
        name,
        id,
        extId,
        version,
        status,
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
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row.time}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.extId}</TableCell>
                <TableCell>{row.version}</TableCell>
                <TableCell>{row.status}</TableCell>
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
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Historikk
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tidspunkt</TableCell>
                                        <TableCell>Tjeneste</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.service}</TableCell>
                                            <TableCell align="right">{historyRow.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('2020-12-21', 'TT-skjema', 'fser24-72hs-ef2', '2dw4', 1, 'ok'),
    createData('2020-12-05', 'Søknadskjema', '94igu-94hv-0os', '3hs7', 2, 'ok'),
    createData('2020-11-2', 'Skjemaskjema', '0dowh-92ud-9rg', '2bf4', 1, 'ok'),
    createData('2020-10-24', 'Skjema42', 'fth24-1f3r-op3', '6fg7', 1, 'feilet'),
    createData('2020-08-05', 'UU-skjema', '2fr24-498f-er3', 'je5y', 1, 'ok'),
    createData('2020-07-25', 'søknad om noe', '6usfg-w45g-g54', 'yte5', 1, 'ok'),
    createData('2020-07-05', 'loremskjema', '34fes-gs4f-j6e', 'jer6', 1, 'feilet'),
    createData('2020-07-05', 'ipsumskjema', 'kl87f-rgrs-l8t', '23da', 1, 'ok'),
    createData('2020-07-05', 'fooskjema', 'jjyr3-h5sd-4rw', 't4es', 1, 'ok'),
    createData('2020-07-05', 'barskjema', 'thehf-j65e-h5w', '87jd', 1, 'ok'),
    createData('2020-06-05', 'bubuskjema', 'grs56-j6eg-he3', '6egh', 1, 'ok'),
    createData('2020-06-05', 'innkjøpsskjema', '234sd-kuts-hte', 'vfsh', 1, 'ok'),
];

function Log() {
    return (
        <TableContainer component={Paper}>
            <Typography variant={"h5"} sx={{m: 3}}>Logg</Typography>
            <Table aria-label="collapsible table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Tidspunkt</TableCell>
                        <TableCell>Navn</TableCell>
                        <TableCell>id</TableCell>
                        <TableCell>Ekstern id</TableCell>
                        <TableCell>Versjon</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Historikk</TableCell>
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