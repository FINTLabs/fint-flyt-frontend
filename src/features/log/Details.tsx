import * as React from "react";
import {Box, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";

const links = [
    {
        name: 'Rediger konfigurasjon',
        value: '/integration/configuration/new',
        external: false
    },
    {
        name: 'Åpne i arkivsystem (åpnes i ny fane)',
        value: '/',
        external: true
    },
    {
        name: 'Åpne i skjemasystem(søknad) (åpnes i ny fane)',
        value: '/',
        external: true
    },
    {
        name: 'Åpne i skjemasystem(editor) (åpnes i ny fane)',
        value: '/',
        external: true
    }
]

const Details: React.FunctionComponent<any> = (props) => {


    return (
        <Box sx={{ margin: 1 }}>
            <Box display="flex" justifyContent="space-between">
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">Detaljer</Typography>
                    <Typography>Arkivsystem id (mappe-id): 2022/163</Typography>
                    <Typography>Skjemasystem id: 12351-sdf4i-134</Typography>
                    <Typography>Versjon: {props.row.version}</Typography>
                </Box>
                <Box sx={{ margin: 1 }}>
                    <Box>{links.map((link: any) => {
                        return <div>
                            {link.external ?
                                <RouterLink target="_blank" to={"/"}> {link.name}
                                    <IconButton size='small' component={RouterLink} target="_blank" to={"/"}>
                                        <OpenInNewIcon fontSize="small"/>
                                    </IconButton>
                                </RouterLink> :
                                <RouterLink to={"/integration/configuration/new"}> {link.name}
                                </RouterLink>}
                        </div>
                    })}</Box>
                </Box>
            </Box>
            <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">Historikk</Typography>
                <Table size="small" sx={{mb: 5}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tidspunkt</TableCell>
                            <TableCell>Handling</TableCell>
                            <TableCell>Tjeneste</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Feilmelding</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.row.history.map((historyRow: any) => (
                            <TableRow key={historyRow.date}>
                                <TableCell component="th" scope="row">{historyRow.date}</TableCell>
                                <TableCell>{historyRow.action}</TableCell>
                                <TableCell>{historyRow.service}</TableCell>
                                <TableCell>{historyRow.status}</TableCell>
                                <TableCell align="right">{historyRow.errorMsg}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}


export default Details;