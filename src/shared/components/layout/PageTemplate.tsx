import { Box, Button, HelpText, HStack, VStack } from '@navikt/ds-react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';

import { PencilWritingIcon, PlusIcon } from '../icons';
import PageHeader from './PageHeader';
import scrollStyles from './scrollLayout.module.css';

type HeaderButtonProps = {
    textKey: string;
    helpTextKey?: string;
    id?: string;
    disabled?: boolean;
    icon?: 'add' | 'edit';
} & ({ to: string; onClick?: never } | { onClick: () => void; to?: never });

interface PageTemplateProps {
    id: string;
    children: React.ReactNode;
    keyPrefix: string;
    wide?: boolean;
    customHeading?: boolean;
    headingHelpTextKey?: string;
    headerButton?: HeaderButtonProps;
    noScroll?: boolean;
}

const HeaderButton: FC<HeaderButtonProps & { label: string }> = ({
    label,
    to,
    onClick,
    id,
    disabled,
    icon = 'add',
}) => {
    const Icon = icon === 'edit' ? <PencilWritingIcon aria-hidden /> : <PlusIcon aria-hidden />;

    if (to) {
        return (
            <Button id={id} disabled={disabled} as={RouterLink} to={to} size="small" icon={Icon}>
                {label}
            </Button>
        );
    }

    return (
        <Button id={id} disabled={disabled} onClick={onClick} size="small" icon={Icon}>
            {label}
        </Button>
    );
};

const PageTemplate = ({
    id,
    children,
    keyPrefix,
    headingHelpTextKey,
    wide,
    customHeading,
    headerButton,
    noScroll,
}: PageTemplateProps) => {
    const { t } = useTranslation('translations', { keyPrefix: keyPrefix });

    return (
        <Box
            paddingInline={wide ? '8' : '32'}
            maxWidth="var(--a-breakpoint-lx)"
            marginInline="auto"
            marginBlock={noScroll ? '0' : '0 8'}
            paddingBlock="8"
            id={id + '-content'}
            className={noScroll ? scrollStyles.viewportFill : undefined}
            style={noScroll ? undefined : { minWidth: 'fit-content' }}
        >
            <VStack
                id={id + '-content-stack'}
                gap="6"
                className={noScroll ? scrollStyles.fill : undefined}
            >
                {!customHeading && (
                    <HStack justify="space-between" align="center">
                        <PageHeader
                            title={t('header')}
                            helperText={headingHelpTextKey && t(headingHelpTextKey)}
                        />
                        {headerButton && (
                            <HStack gap="2" align="center">
                                <HeaderButton {...headerButton} label={t(headerButton.textKey)} />
                                {headerButton.helpTextKey && (
                                    <HelpText placement="left">
                                        {t(headerButton.helpTextKey)}
                                    </HelpText>
                                )}
                            </HStack>
                        )}
                    </HStack>
                )}
                {children}
            </VStack>
        </Box>
    );
};
export default PageTemplate;
