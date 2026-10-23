import { Button, ButtonProps } from '@navikt/ds-react';
import * as React from 'react';

import { MagnifyingGlassIcon } from '../../../../shared/components/icons';

type SearchButtonProps = ButtonProps & {
    onClick: () => void;
};

export const SearchButton: React.FunctionComponent<SearchButtonProps> = ({
    onClick,
    disabled,
}: SearchButtonProps) => {
    return (
        <Button
            size="xsmall"
            style={{ borderRadius: 'var(--a-border-radius-full)', marginBlockEnd: '0.5rem' }}
            onClick={onClick}
            type={'button'}
            icon={<MagnifyingGlassIcon />}
            disabled={disabled}
            variant={'tertiary'}
        />
    );
};
