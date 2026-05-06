import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Box, LocalAlert, LocalAlertProps } from '@navikt/ds-react';
import { transformPath } from '../../util/ProblemDetailUtil';

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
        <Box position={'absolute'} top={'16'} right={'12'} style={{ zIndex: 1000 }}>
            {open && (
                <LocalAlert id={id} status={status} size="small" style={{ maxWidth: '500px' }}>
                    <LocalAlert.Header style={{ maxWidth: '500px' }}>
                        <LocalAlert.Title>{title}</LocalAlert.Title>
                        <LocalAlert.CloseButton onClick={onClose} />
                    </LocalAlert.Header>

                    {content && (
                        <LocalAlert.Content>
                            {status === 'error' ? (
                                <ValidationErrorContent message={content} />
                            ) : (
                                content
                            )}
                        </LocalAlert.Content>
                    )}
                </LocalAlert>
            )}
        </Box>
    );
};

export default AlertMessage;

function ValidationErrorContent({ message }: { message: string }) {
    if (!message.includes('Validation errors') && !message.includes('Validation error')) {
        return message;
    }

    const match = message.match(/\[(.*)\]/s);
    if (!match) {
        return message;
    }

    const rawList = match[1];

    const errors = rawList.split(/',\s*'/).map((e) => e.replace(/^'/, '').replace(/'$/, ''));

    return (
        <div>
            <strong>Validation errors:</strong>
            <ul style={{ marginTop: 8 }}>
                {errors.map((error, index) => (
                    <li key={index}>
                        <ValidationErrorItem error={error} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ValidationErrorItem({ error }: { error: string }) {
    const matches = [...error.matchAll(/\[(.*?)\]/g)];

    const faultyMetadataString = matches.length ? matches[matches.length - 1][1] : '';

    // Denne er ikke helt clean, men siden vi sjekker etter "Validation error" i message så kan vi anta...
    const containsIndex = error.indexOf(' contains ');
    const pathToErrorLocation = containsIndex !== -1 ? error.substring(0, containsIndex) : error;

    const lastBracketIndex = error.lastIndexOf('[');

    const middleText =
        containsIndex !== -1 && lastBracketIndex !== -1
            ? error.substring(containsIndex, lastBracketIndex).trim()
            : '';

    const faultyMetadata = faultyMetadataString
        .split(',')
        .map((ref) => ref.trim())
        .filter(Boolean);

    const readablePathToErrorLocation = transformPath(pathToErrorLocation);

    return (
        <div>
            <div style={{ fontWeight: 500, marginTop: '8px' }}>{readablePathToErrorLocation}</div>
            <ul>
                {middleText && <li>{middleText.replace(':', '')}:</li>}
                <ul>
                    {faultyMetadata.map((ref, i) => (
                        <li key={i}>{ref}</li>
                    ))}
                </ul>
            </ul>
        </div>
    );
}
