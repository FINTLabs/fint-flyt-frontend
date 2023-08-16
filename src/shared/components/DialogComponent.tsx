import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from "@mui/material";

interface Props {
    title: string,
    content: string,
    open: boolean
}

const DialogComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [open, setOpen] = React.useState(props.open);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason && reason == "backdropClick" && "escapeKeyDown")
            return;
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={handleClose}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export default DialogComponent;