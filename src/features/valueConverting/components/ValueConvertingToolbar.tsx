import { Button, HelpText, HStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';

import { PlusIcon } from '../../../shared/components/icons';
import { TableToolbar } from '../../../shared/components/table/TableToolbar';

type Props = {
    onNewConverting: () => void;
};

export function ValueConvertingToolbar({ onNewConverting }: Props) {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });

    return (
        <TableToolbar
            end={
                <HStack gap="2" align="center">
                    <Button
                        id="new-button"
                        size="small"
                        icon={<PlusIcon aria-hidden />}
                        onClick={onNewConverting}
                        className="table-toolbar-button"
                    >
                        {t('button.newConverting')}
                    </Button>
                    <HelpText placement="left">{t('help.new')}</HelpText>
                </HStack>
            }
        />
    );
}
