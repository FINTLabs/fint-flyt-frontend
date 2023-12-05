import {IEvent} from "../types/Event";
import {IconButton} from "@mui/material";
import {CheckmarkCircleFillIcon, XMarkOctagonFillIcon} from "@navikt/aksel-icons";
import InfoIcon from "@mui/icons-material/Info";
import * as React from "react";

export function GetIcon(event: IEvent) {
    if (event.type === 'ERROR') {
        return <IconButton disabled><XMarkOctagonFillIcon color={'red'} title="a11y-title"
                                                          fontSize="1.5rem"/></IconButton>
    } else if (event.type === 'INFO' && event.name !== 'instance-dispatched') {
        return <IconButton disabled><InfoIcon color="info"/></IconButton>
    } else if (event.name === 'instance-dispatched') {
        return <IconButton disabled><CheckmarkCircleFillIcon color={'green'} title="a11y-title"
                                                             fontSize="1.5rem"/></IconButton>
    } else return;
}