import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import * as React from "react";
import {Link as RouterLink} from "react-router-dom";
import {ILink} from "./types/Link";
import {ClassNameMap} from "@mui/styles";

type Props = {
    content: string
    value: string
    links?: ILink[],
    id: string
    classes: ClassNameMap
}

const DashboardCard: React.FunctionComponent<Props> = (props: Props) => {
    const classes = props.classes;

    return (
        <Card className={classes.card} sx={{minWidth: 200, maxWidth: 345, boxShadow: 'none'}}>
            <CardContent>
                <Typography>
                    {props.value} {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                {props.links && props.links.map((link: ILink, index: number) => {
                    return (
                        <Button key={index} id={props.id + `-btn-` + index} size="small" variant="text"
                                component={RouterLink} to={link.href}>{link.name}</Button>
                    )
                })}
            </CardActions>
        </Card>
    );
}

export default DashboardCard;