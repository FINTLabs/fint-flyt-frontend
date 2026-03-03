import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Box, LocalAlert, LocalAlertProps } from '@navikt/ds-react';

type SnackbarProps = LocalAlertProps & {
    id: string;
    onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
    autoHideDuration?: number;
    open: boolean;
};
const Snackbar: React.FunctionComponent<SnackbarProps> = ({
    id,
    status,
    onClose,
    autoHideDuration = 4000,
    open,
    children,
}: SnackbarProps) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (open) {
            timeoutRef.current = setTimeout(() => {
                onClose(new Event('close'), 'timeOut');
            }, autoHideDuration);
        }

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [open, autoHideDuration, onClose]);

    const handleManualClose = (e: React.SyntheticEvent) => onClose(e, 'closeButton');

    return (
        <Box position="absolute" top="16" right="12">
            {open && (
                <LocalAlert id={id} status={status}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>{children}</LocalAlert.Title>
                        <LocalAlert.CloseButton onClick={handleManualClose} />
                    </LocalAlert.Header>
                </LocalAlert>
            )}
        </Box>
    );
};

export default Snackbar;
