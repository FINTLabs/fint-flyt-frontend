import {
    Box,
    Button,
    Heading,
    HelpText,
    HStack,
    InlineMessage,
    Loader,
    Spacer,
} from '@navikt/ds-react';
import * as React from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ChevronLeftIcon, ChevronRightIcon } from '../../../shared/components/icons';
import { ConfigurationContext } from '../context/ConfigurationContext';
import ConfigurationMappingComponent from './mapping/ConfigurationMappingComponent';

export interface Props {
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const OutgoingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });

    const { template, templateStatus } = useContext(ConfigurationContext);

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
            borderWidth="1"
            borderColor={'border-subtle'}
        >
            <HStack gap={'10'}>
                <HStack>
                    <Heading size={'small'}>{t('formHeader')}</Heading>
                    <HelpText title={'Hva er dette?'} placement={'right'}>
                        {t('help.formHeader')}
                    </HelpText>
                </HStack>
                <Spacer />
                <Box borderRadius="medium">
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
                {templateStatus === 'success' && template && (
                    <HStack id="configuration-mapping-wrapper" wrap={false}>
                        <ConfigurationMappingComponent
                            mappingTemplate={template}
                            onCollectionReferencesInEditContextChange={(collectionReferences) => {
                                props.onCollectionReferencesInEditContextChange(
                                    collectionReferences
                                );
                            }}
                        />
                    </HStack>
                )}
                {templateStatus === 'loading' && <Loader size="medium" title="Venter..." />}
                {templateStatus === 'error' && (
                    <InlineMessage status={'error'}>{t('genericError')}</InlineMessage>
                )}
            </Box>
        </Box>
    );
};
export default OutgoingDataComponent;
