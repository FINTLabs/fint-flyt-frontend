import { ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { ReactElement } from 'react';

export type Props = {
    id: string;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    icon?: ReactElement;
    active?: boolean;
};

const MetadataContentWrapper: React.FC<Props> = ({
    id,
    title,
    description,
    children,
    icon,
    active,
}) => {
    return (
        <ExpansionCard
            id={id}
            size="small"
            aria-label={title ?? ''}
            defaultOpen={true}
            className={active ? 'active' : ''}
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    {title}
                </ExpansionCard.Title>
                {description && (
                    <ExpansionCard.Description>
                        <HStack align={'center'} gap={'2'}>
                            {icon && icon}
                            {description}
                        </HStack>
                    </ExpansionCard.Description>
                )}
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap={'1'}>{children}</VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default MetadataContentWrapper;
