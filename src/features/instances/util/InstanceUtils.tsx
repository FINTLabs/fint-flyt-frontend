import { IEvent, IEventNew } from '../types/Event';
import { IconButton } from '@mui/material';
import { CheckmarkCircleFillIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import * as React from 'react';

export function GetIcon(event: string) {
    if (event === 'FAILED' || event === 'ERROR') {
        return (
            <IconButton disabled>
                <XMarkOctagonFillIcon color={'red'} title="a11y-title" fontSize="1.5rem" />
            </IconButton>
        );
    }
    if (event === 'INSTANCE_DISPATCHED') {
        return (
            <IconButton disabled>
                <CheckmarkCircleFillIcon color={'green'} title="a11y-title" fontSize="1.5rem" />
            </IconButton>
        );
    } else if (event === 'INSTANCE_MANUALLY_PROCESSED' || event === 'INSTANCE_MANUALLY_REJECTED') {
        return (
            <IconButton disabled>
                <ManageAccountsIcon
                    color={event === 'INSTANCE_MANUALLY_PROCESSED' ? 'success' : 'disabled'}
                />
            </IconButton>
        );
    } else {
        return (
            <IconButton disabled>
                <InfoIcon color="info" />
            </IconButton>
        );
    }
}
