import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { testObjectTemplateSak } from '../defaults/FormTemplates';
import ConfigurationMappingComponent from './mapping/ConfigurationMappingComponent';
import { Box, Button, Heading, HelpText, HStack, Spacer } from '@navikt/ds-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';

export interface Props {
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const OutgoingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            if (direction === 'left') {
                scrollContainerRef.current.scrollLeft -= scrollAmount;
            } else {
                scrollContainerRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <Box
            style={{ minWidth: '400px', maxWidth: '70vw', overflow: 'auto' }}
            id={'outgoing-form-panel'}
            background={'surface-default'}
            padding="6"
            borderRadius={'large'}
            borderWidth="2"
            borderColor={'border-subtle'}
        >
            {/* Scroll Buttons */}
            <HStack gap={'10'}>
                <HStack>
                    <Heading size={'small'}>{t('formHeader')}</Heading>
                    <HelpText title={'Hva er dette?'} placement={'right'}>
                        {t('help.formHeader')}
                    </HelpText>
                </HStack>
                <Spacer />
                <Box background="surface-action-subtle" borderRadius="medium">
                    <Button
                        variant="tertiary"
                        onClick={() => scroll('left')}
                        icon={<ChevronLeftIcon />}
                        type={'button'}
                        size={'medium'}
                    />

                    <Button
                        variant="tertiary"
                        onClick={() => scroll('right')}
                        icon={<ChevronRightIcon />}
                        type={'button'}
                        size={'medium'}
                    />
                </Box>
            </HStack>

            {/* Scrollable Content */}
            <Box
                id="scroll-container"
                ref={scrollContainerRef}
                style={{ overflowX: 'auto', display: 'flex', gap: '1rem' }}
            >
                <HStack id="configuration-mapping-wrapper" wrap={false}>
                    <ConfigurationMappingComponent
                        mappingTemplate={testObjectTemplateSak}
                        onCollectionReferencesInEditContextChange={(collectionReferences) => {
                            props.onCollectionReferencesInEditContextChange(collectionReferences);
                        }}
                    />
                </HStack>
            </Box>
        </Box>
    );
};
export default OutgoingDataComponent;
