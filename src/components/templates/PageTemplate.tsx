import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, HelpText, HStack, VStack } from '@navikt/ds-react';
import PageHeader from '../atoms/PageHeader';
import { Link as RouterLink } from 'react-router';
import { PencilWritingIcon, PlusIcon } from '@navikt/aksel-icons';

type HelperTextProps = {
    title?: string;
    info: string;
};

type HeaderButtonProps = {
    text: string;
    buttonHelpText?: HelperTextProps;
    id?: string;
    headerButton?: HeaderButtonProps | undefined;
    disabled?: boolean;
    icon?: 'add' | 'edit';
} & ({ to: string; onClick?: never } | { onClick: () => void; to?: never });

interface InformationTemplateProps {
    id: string;
    children: React.ReactNode;
    keyPrefix: string;
    wide?: boolean;
    customHeading?: boolean;
    headingHelpText?: HelperTextProps;
    headerButton?: HeaderButtonProps;
}

const HeaderButton: FC<{ headerButton?: HeaderButtonProps }> = ({ headerButton }) => {
    if (!headerButton) return null;

    if (headerButton.to) {
        return (
            <HStack gap={'2'} align="center">
                <Button
                    id={headerButton.id}
                    disabled={headerButton.disabled}
                    as={RouterLink}
                    to={headerButton.to}
                    size="small"
                    icon={
                        headerButton.icon === 'edit' ? (
                            <PencilWritingIcon aria-hidden />
                        ) : (
                            <PlusIcon aria-hidden />
                        )
                    }
                >
                    {headerButton.text}
                </Button>
                {headerButton.buttonHelpText && (
                    <HelpText
                        title={headerButton.buttonHelpText.title ?? 'Knapp informasjon'}
                        placement="left"
                    >
                        {headerButton.buttonHelpText.info}
                    </HelpText>
                )}
            </HStack>
        );
    }

    return (
        <HStack gap={'2'} align="center">
            <Button
                id={headerButton.id}
                disabled={headerButton.disabled}
                onClick={headerButton.onClick}
                size="small"
                icon={
                    headerButton.icon === 'edit' ? (
                        <PencilWritingIcon aria-hidden />
                    ) : (
                        <PlusIcon aria-hidden />
                    )
                }
            >
                {headerButton.text}
            </Button>
            {headerButton.buttonHelpText && (
                <HelpText
                    title={headerButton.buttonHelpText.title ?? 'Knapp informasjon'}
                    placement="left"
                >
                    {headerButton.buttonHelpText.info}
                </HelpText>
            )}
        </HStack>
    );
};

const PageTemplate = ({
    id,
    children,
    keyPrefix,
    headingHelpText,
    wide,
    customHeading,
    headerButton,
}: InformationTemplateProps) => {
    const { t } = useTranslation('translations', { keyPrefix: keyPrefix });

    return (
        <Box
            paddingInline={wide ? '8' : '32'}
            maxWidth={'var(--a-breakpoint-lx)'}
            marginInline={'auto'}
            paddingBlock="8"
            id={id + '-content'}
            style={{ minWidth: 'fit-content' }}
        >
            <VStack id={id + '-content-stack'} gap={'6'}>
                {!customHeading && (
                    <HStack justify={'space-between'} align={'center'}>
                        <PageHeader
                            title={t('header')}
                            helperTextTitle={headingHelpText?.title}
                            helperText={headingHelpText?.info && headingHelpText.info}
                        />
                        <HeaderButton headerButton={headerButton} />
                    </HStack>
                )}
                {children}
            </VStack>
        </Box>
    );
};
export default PageTemplate;
