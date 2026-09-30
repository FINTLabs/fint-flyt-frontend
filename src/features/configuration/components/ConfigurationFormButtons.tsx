import { Button, ButtonProps } from '@navikt/ds-react';
import * as React from 'react';
import { ReactNode } from 'react';

import {
    CheckmarkHeavyIcon,
    MinusIcon,
    PencilIcon,
    PlusIcon,
} from '../../../shared/components/icons';

type IconButtonProps = ButtonProps & {
    icon: ReactNode;
    onClick: () => void;
    ariaLabel?: string;
};

export const IconButton: React.FunctionComponent<IconButtonProps> = ({
    id,
    ariaLabel,
    icon,
    onClick,
    disabled,
    type = 'button',
    variant = 'tertiary-neutral',
    size = 'medium',
}: IconButtonProps) => {
    return (
        <Button
            id={id}
            size={size}
            style={{ borderRadius: 'var(--a-border-radius-full)' }}
            aria-label={ariaLabel}
            onClick={onClick}
            type={type}
            icon={icon}
            disabled={disabled}
            variant={variant}
        />
    );
};

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
