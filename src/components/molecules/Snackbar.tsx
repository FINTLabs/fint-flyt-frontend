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
    const timeoutRef = useRef<NodeJS.Timeout | string | number | undefined>();
        useEffect(() => {
        if (open) {
            timeoutRef.current = setTimeout(() => {
                onClose(new Event('close'), 'timeOut');
            }, autoHideDuration);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [open]);

    return (
        <Box position={'absolute'} top={'16'} right={'12'}>
            {open && (
                <LocalAlert id={id} status={status}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>{children}</LocalAlert.Title>
                        <LocalAlert.CloseButton onClick={onClose} />
                    </LocalAlert.Header>
                </LocalAlert>
            )}
        </Box>
    );
};

export default Snackbar;
