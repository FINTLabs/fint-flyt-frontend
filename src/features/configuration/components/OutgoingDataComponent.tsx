import { Box, Heading, HStack, InlineMessage, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import scrollStyles from '../../../shared/components/layout/scrollLayout.module.css';
import { ConfigurationContext } from '../context/ConfigurationContext';
import ConfigurationMappingComponent from './mapping/ConfigurationMappingComponent';

export interface Props {
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const OutgoingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });

    const { template, templateStatus } = useContext(ConfigurationContext);

    return (
        <Box
            id={'outgoing-form-panel'}
            background={'surface-default'}
            paddingInline="6"
            paddingBlock='6 0'
            borderRadius={'large'}
            borderWidth="1"
            borderColor={'border-subtle'}
            className={scrollStyles.mainPanel}
        >
            <Heading size={'small'} className={scrollStyles.fixed}>
                {t('formHeader')}
            </Heading>

            <Box id="scroll-container" className={scrollStyles.scroll}>
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
