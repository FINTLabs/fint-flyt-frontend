import { EditOffRounded, EditRounded } from '@mui/icons-material';
import { Box, Heading, HStack } from '@navikt/ds-react';
import * as React from 'react';
import { MutableRefObject, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import IconButton from '../../../IconButton';
import { ConfigurationContext } from '../../../../context/ConfigurationContext';
import { EditingContext } from '../../../../context/EditingContext';
import { ValueType as ConfigurationValueType } from '../../../../types/Configuration';
import { ValueType } from '../../../../types/Metadata/IntegrationMetadata';
import { isOutsideCollectionEditContext } from '../../../../util/KeyUtils';
import { hasValidFormat } from '../../../../util/ValidationUtil';
import ArrayComponent from '../../../array/ArrayComponent';
import ArrayValueWrapperComponent from '../../../array/ArrayValueWrapperComponent';
import DynamicChipComponent from '../../value/string/DynamicChipComponent';

interface Props {
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.configuration.fromCollectionMapping',
    });
    const { control, watch } = useFormContext();
    const { completed } = useContext(ConfigurationContext);
    const { editCollectionAbsoluteKey, setEditCollectionAbsoluteKey } = useContext(EditingContext);
    const isEditingRef: MutableRefObject<boolean> = useRef<boolean>(false);
    const [isEditingState, setIsEditingState] = useState<boolean>(false);

    useEffect(() => {
        const isEditing: boolean = editCollectionAbsoluteKey === props.absoluteKey;
        if (isEditing !== isEditingRef.current) {
            isEditingRef.current = isEditing;
            setIsEditingState(isEditing);
        }
    }, [editCollectionAbsoluteKey]);

    useEffect(() => {
        return () => {
            if (isEditingRef.current) {
                setEditCollectionAbsoluteKey('');
            }
        };
    }, []);

    return (
        <>
            <Box>
                <HStack
                    id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                    justify={'space-between'}
                    align={'center'}>
                    <Heading id={'collection-mapping-header-' + props.absoluteKey} size={'small'}>
                        {t('collections')}
                    </Heading>
                    <IconButton
                        id={'edit-collection-mapping-button'}
                        ariaLabel="edit"
                        onClick={() => {
                            setEditCollectionAbsoluteKey(isEditingState ? '' : props.absoluteKey);
                        }}
                        icon={
                            isEditingState ? (
                                <EditOffRounded style={{ color: 'blue' }} />
                            ) : (
                                <EditRounded />
                            )
                        }
                    />
                </HStack>
                <ArrayComponent
                    absoluteKey={props.absoluteKey + '.instanceCollectionReferencesOrdered'}
                    fieldComponentCreator={(index: number, absoluteKey: string) => (
                        <ArrayValueWrapperComponent
                            content={
                                <Controller
                                    name={absoluteKey}
                                    rules={{
                                        validate: (value) =>
                                            hasValidFormat(
                                                value,
                                                ConfigurationValueType.DYNAMIC_STRING,
                                                watch('completed'),
                                                true
                                            ),
                                    }}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <DynamicChipComponent
                                            {...field}
                                            displayName={'' + index}
                                            accept={[ValueType.COLLECTION]}
                                            disabled={completed}
                                            fieldState={fieldState}
                                        />
                                    )}
                                />
                            }
                        />
                    )}
                    defaultValueCreator={() => undefined}
                    disabled={
                        isOutsideCollectionEditContext(
                            props.absoluteKey,
                            editCollectionAbsoluteKey
                        ) || completed
                    }
                />
            </Box>
            <Heading size={'small'} id={'collection-mapping-header-' + props.absoluteKey}>
                {t('convertCollectionElements')}
            </Heading>
            {props.elementComponentCreator(props.absoluteKey + '.elementMapping')}
        </>
    );
};
export default FromCollectionMappingComponent;
