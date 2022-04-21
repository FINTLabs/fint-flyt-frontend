import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import * as React from "react";
import {Link as RouterLink} from "react-router-dom";
import {ILink} from "./types/Link";

const DashboardCard: React.FunctionComponent<any> = (props) => {
    const classes = props.classes;

    return (
        <Card className={classes.card} sx={{ minWidth: 200, maxWidth: 345 }}>
            <CardContent>
                <Typography>
                    {props.value} {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                {props.links && props.links.map((link: ILink, index: number) => {
                    return (
                        <Button key={index} id={props.id + `-btn-` + index} size="small" variant="text" component={RouterLink} to={link.href}>{link.name}</Button>
                    )
                })}
            </CardActions>
        </Card>
    );
}

export default DashboardCard;