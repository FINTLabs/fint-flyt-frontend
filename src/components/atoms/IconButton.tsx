import * as React from 'react';
import { Button, ButtonProps } from '@navikt/ds-react';
import { ReactNode } from 'react';

type IconButtonProps = ButtonProps & {
    icon: ReactNode;
    onClick: () => void;
    ariaLabel?: string;
};

const IconButton: React.FunctionComponent<IconButtonProps> = ({
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

export default IconButton;
