import { Button, ButtonProps } from '@navikt/ds-react';
import * as React from 'react';

import { SearchRoundedIcon } from '../../../../shared/components/icons';

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
            style={{ borderRadius: 'var(--a-border-radius-full)' }}
            onClick={onClick}
            type={'button'}
            icon={<SearchRoundedIcon />}
            disabled={disabled}
            variant={'tertiary'}
        />
    );
};
