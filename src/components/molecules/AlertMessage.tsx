import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Box, LocalAlert, LocalAlertProps } from '@navikt/ds-react';

type SnackbarProps = {
    id: string;
    status: LocalAlertProps['status'];
    onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
    autoHideDuration?: number;
    open: boolean;
    title: string;
    content?: string;
};
const AlertMessage: React.FunctionComponent<SnackbarProps> = ({
    id,
    status,
    onClose,
    autoHideDuration = 4000,
    open,
    title,
    content,
}: SnackbarProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | string | number | undefined>();
    useEffect(() => {
        if (open && status !== 'error') {
            timeoutRef.current = setTimeout(() => {
                onClose(new Event('close'), 'timeOut');
            }, autoHideDuration);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [open]);

    return (
        <Box position={'absolute'} top={'16'} right={'12'} maxWidth={'500px'}>
            {open && (
                <LocalAlert id={id} status={status}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>{title}</LocalAlert.Title>
                        <LocalAlert.CloseButton onClick={onClose} />
                    </LocalAlert.Header>
                    {content && <LocalAlert.Content>{content}</LocalAlert.Content>}
                </LocalAlert>
            )}
        </Box>
    );
};

export default AlertMessage;
