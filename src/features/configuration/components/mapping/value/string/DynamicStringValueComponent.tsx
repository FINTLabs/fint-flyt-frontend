import { BodyShort, HStack, Textarea } from '@navikt/ds-react';
import * as React from 'react';
import { BaseSyntheticEvent, forwardRef, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';

import useResourceRepository from '../../../../../../shared/api/useResourceRepository';
import { ValueType } from '../../../../types/Metadata/IntegrationMetadata';
import { ITag } from '../../../../types/Metadata/Tag';
import { Search } from '../../../../util/urlUtils';
import { SearchButton } from '../../../buttons/SearchButton';
import configurationStyles from '../../../styles/configuration.module.css';

interface Props {
    displayName?: string;
    search?: Search;
    accept: ValueType[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined;
}

const DynamicStringValueComponent: React.FunctionComponent<Props> = forwardRef<
    HTMLTextAreaElement,
    Props
>((props: Props, ref) => {
    const ResourceRepository = useResourceRepository();
    const [searchResult, setSearchResult] = useState<string>();
    const absoluteKey: string = props.name;
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });

    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            if (!props.disabled) {
                if (props.onChange) {
                    if (props.value === undefined || props.value === '') {
                        props.onChange(tag.value);
                    } else {
                        props.onChange(props.value + tag.value);
                    }
                }
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });

    useEffect(() => {
        setSearchResult(undefined);
    }, [props.search]);

    let dropClassName = configurationStyles.dynamicInput;
    if (canDrop && isOver && !props.disabled) {
        dropClassName = `${configurationStyles.dynamicInput} ${configurationStyles.dynamicInputActive}`;
    } else if (canDrop && !props.disabled) {
        dropClassName = `${configurationStyles.dynamicInput} ${configurationStyles.dynamicInputCanDrop}`;
    }

    return (
        <div
            id={'dnd-value-component-' + absoluteKey}
            ref={dropRef as unknown as React.Ref<HTMLDivElement>}
            key={absoluteKey}
            className={configurationStyles.inputFullWidth}
        >
            <HStack gap="2" align="end" wrap={false} width="100%">
                <Textarea
                    id={absoluteKey}
                    className={`${configurationStyles.input} ${configurationStyles.inputFullWidth} ${dropClassName}`}
                    autoComplete="off"
                    size="small"
                    minRows={1}
                    maxRows={5}
                    label={props.displayName}
                    disabled={props.disabled}
                    onChange={(e: BaseSyntheticEvent) => {
                        if (props.onChange) {
                            props.onChange(e.target.value);
                        }
                    }}
                    onBlur={props.onBlur}
                    value={props.value ?? ''}
                    name={props.name}
                    ref={ref}
                    errorId={`error-message-${absoluteKey}`}
                    error={
                        props.fieldState?.error ? (
                            <span data-testid="error-message">{t('label.formatError')}</span>
                        ) : undefined
                    }
                />
                {props.search && (
                    <SearchButton
                        onClick={() => {
                            if (props.search?.source) {
                                ResourceRepository.search(props.search.source).then(
                                    (result: { value: string } | undefined) => {
                                        setSearchResult(
                                            'Søkeresultat: ' + (result?.value ?? 'Ingen treff')
                                        );
                                    }
                                );
                            }
                        }}
                    />
                )}
            </HStack>
            {searchResult && (
                <BodyShort size={'small'} style={{ padding: 'var(--a-spacing-1)' }}>
                    {searchResult}
                </BodyShort>
            )}
        </div>
    );
});

DynamicStringValueComponent.displayName = 'DynamicStringValueComponent';
export default DynamicStringValueComponent;
