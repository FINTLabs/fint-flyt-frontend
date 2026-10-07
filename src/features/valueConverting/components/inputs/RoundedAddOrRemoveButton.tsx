import { Button } from '@navikt/ds-react';
import * as React from 'react';

import { MinusIcon, PlusIcon } from '../../../../shared/components/icons';

export const RoundedAddOrRemoveButton: React.FunctionComponent<{
    isAdd: boolean;
    onClick: () => void;
    disabled?: boolean;
}> = ({ isAdd, onClick, disabled }) => {
    return (
        <Button
            type="button"
            id={isAdd ? 'add-icon' : 'remove-icon'}
            aria-label={isAdd ? 'add' : 'remove'}
            icon={isAdd ? <PlusIcon /> : <MinusIcon />}
            onClick={onClick}
            disabled={disabled}
            variant={'tertiary-neutral'}
            style={{ borderRadius: 'var(--a-border-radius-full)' }}
        />
    );
};
