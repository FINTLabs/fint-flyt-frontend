import { ActionMenu, Button } from '@navikt/ds-react';
import * as React from 'react';

import { MenuElipsisVerticalIcon } from '../icons';

type TableRowActionsButtonProps = {
    id: number | string;
    children: React.ReactNode;
};

export function TableRowActionsMenu({ id, children }: TableRowActionsButtonProps) {
    return (
        <div id={id + '-action-toggle'} className="min-h-32">
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button
                        variant="tertiary-neutral"
                        size={'small'}
                        icon={<MenuElipsisVerticalIcon aria-hidden />}
                    />
                </ActionMenu.Trigger>
                <ActionMenu.Content data-testid="action-menu-content">
                    {children}
                </ActionMenu.Content>
            </ActionMenu>
        </div>
    );
}
