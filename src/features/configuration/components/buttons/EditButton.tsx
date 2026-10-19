import { Button } from '@navikt/ds-react';
import * as React from 'react';

import { CheckmarkHeavyIcon, PencilIcon } from '../../../../shared/components/icons';

export const EditButton: React.FunctionComponent<{
    id: string;
    editLabel: string;
    closeLabel: string;
    onClick: () => void;
    disabled?: boolean;
    isEditingState: boolean;
}> = ({ id, editLabel, closeLabel, onClick, disabled, isEditingState = false }) => {
    return (
        <Button
            id={id}
            aria-label={isEditingState ? editLabel : closeLabel}
            onClick={onClick}
            icon={isEditingState ? <CheckmarkHeavyIcon /> : <PencilIcon />}
            disabled={disabled}
            type={'button'}
            variant={'tertiary'}
            size={'small'}
            iconPosition="right"
        >
            {isEditingState ? closeLabel : editLabel}
        </Button>
    );
};
