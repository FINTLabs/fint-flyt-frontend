import { Box, Heading, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfigurationContext } from '../../../../context/ConfigurationContext';
import { EditingContext } from '../../../../context/EditingContext';
import { isOutsideCollectionEditContext } from '../../../../util/keyUtils';
import FieldArray from '../../../../../../shared/components/inputs/FieldArray';
import ArrayObjectWrapperComponent from '../../../array/ArrayObjectWrapperComponent';
import ArrayValueWrapperComponent from '../../../array/ArrayValueWrapperComponent';
import FromCollectionMappingComponent from './FromCollectionMappingComponent';

interface Props {
    absoluteKey: string;
    createObjectWrapper?: boolean;
    elementComponentCreator: (
        order: string,
        displayPath: string[],
        absoluteKey: string
    ) => ReactElement;
    onFieldClose?: (order: string) => void;
}

const CollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.configuration.collectionMapping',
    });
    const { completed } = useContext(ConfigurationContext);
    const { editCollectionAbsoluteKey } = useContext(EditingContext);

    return (
        <VStack>
            <Box>
                <Heading size={'small'}>{t('defaultElements')}</Heading>
                <FieldArray
                    fromCollection
                    absoluteKey={props.absoluteKey + '.elementMappings'}
                    fieldComponentCreator={(index: number, absoluteKey: string) => {
                        const field: ReactElement = props.elementComponentCreator(
                            0 + '-' + index,
                            [t('defaultElements'), (index + 1).toString()],
                            absoluteKey
                        );
                        return props.createObjectWrapper ? (
                            <ArrayObjectWrapperComponent content={field} />
                        ) : (
                            <ArrayValueWrapperComponent content={field} />
                        );
                    }}
                    defaultValueCreator={() => {
                        return {};
                    }}
                    onFieldClose={(index: number) => {
                        if (props.onFieldClose) {
                            props.onFieldClose(0 + '-' + index);
                        }
                    }}
                    disabled={
                        isOutsideCollectionEditContext(
                            props.absoluteKey,
                            editCollectionAbsoluteKey
                        ) || completed
                    }
                />
            </Box>
            <Heading size={'small'}>{t('generatedElements')}</Heading>
            <FieldArray
                fromCollection
                absoluteKey={props.absoluteKey + '.fromCollectionMappings'}
                fieldComponentCreator={(index: number, absoluteKey: string) => (
                    <ArrayObjectWrapperComponent
                        content={
                            <FromCollectionMappingComponent
                                absoluteKey={absoluteKey}
                                elementComponentCreator={(absoluteKey: string) =>
                                    props.elementComponentCreator(
                                        1 + '-' + index,
                                        [t('generatedElements'), (index + 1).toString()],
                                        absoluteKey
                                    )
                                }
                            />
                        }
                    />
                )}
                defaultValueCreator={() => {
                    return {};
                }}
                onFieldClose={(index: number) => {
                    if (props.onFieldClose) {
                        props.onFieldClose(1 + '-' + index);
                    }
                }}
                disabled={
                    isOutsideCollectionEditContext(props.absoluteKey, editCollectionAbsoluteKey) ||
                    completed
                }
            />
        </VStack>
    );
};
export default CollectionMappingComponent;
