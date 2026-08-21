import { Button, HStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';

import { PlusIcon } from '../../../shared/components/icons';
import { TableToolbar } from '../../../shared/components/table/TableToolbar';

export function IntegrationToolbar() {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrations' });

    return (
        <TableToolbar
            end={
                <HStack gap="2" align="center">
                    <Button
                        as={RouterLink}
                        to="/integration/new"
                        size="small"
                        icon={<PlusIcon aria-hidden />}
                        className="table-toolbar-button"
                    >
                        {t('button.newIntegration')}
                    </Button>
                </HStack>
            }
        />
    );
}
