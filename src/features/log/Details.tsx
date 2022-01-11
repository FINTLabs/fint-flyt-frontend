import * as React from "react";
import {Box, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";


const Details: React.FunctionComponent<any> = (props) => {
    return (
        <Box sx={{ margin: 1, maxWidth: 1050 }}>
            <Box display="flex" justifyContent="space-between">
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">Detaljer</Typography>
                    <Typography>Ekstern id: 12351-sdf4i-134</Typography>
                    <Typography>Versjon: {props.row.version} <RouterLink target="_blank" to={"/integration/configuration/new"}>Rediger</RouterLink>
                    </Typography>
                </Box>
                <Box sx={{ margin: 1 }}>
                    <Box>{props.row.links.map((link: any) => {
                        return <div>
                            {link.external ? <Link> {link.name} <IconButton size='small' component={RouterLink} target="_blank" to={"/integration/configuration/new"}> <OpenInNewIcon fontSize="small"/></IconButton> </Link> : null}
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
                            <TableCell>Tjeneste</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.row.history.map((historyRow: any) => (
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
        </Box>
    );
}


export default Details;