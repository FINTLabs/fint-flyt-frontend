import { Button, HStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';

import { PencilWritingIcon } from '../../../shared/components/icons';
import { TableToolbar } from '../../../shared/components/table/TableToolbar';

type Props = {
    disabled?: boolean;
    onEdit: () => void;
};

export function UserAccessToolbar({ disabled, onEdit }: Props) {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.useraccess' });

    return (
        <TableToolbar
            end={
                <HStack gap="2" align="center">
                    <Button
                        id="edit-toggle-btn"
                        size="small"
                        icon={<PencilWritingIcon aria-hidden />}
                        onClick={onEdit}
                        disabled={disabled}
                    >
                        {t('button.edit')}
                    </Button>
                </HStack>
            }
        />
    );
}
