import * as React from 'react';
import { ReactElement } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PlusIcon } from '@navikt/aksel-icons';
import RemoveIcon from '@mui/icons-material/Remove';
import { iconButtonSX } from '../../../../../util/styles/SystemStyles';
import { Box, HStack } from '@navikt/ds-react';
import IconButton from '../../../../../components/atoms/IconButton';

interface Props {
    absoluteKey: string;
    fieldComponentCreator: (index: number, absoluteKey: string) => ReactElement;
    defaultValueCreator: () => any; // eslint-disable-line
    onFieldClose?: (index: number) => void;
    disabled?: boolean;
    fromCollection?: boolean;
}

const ArrayComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: props.absoluteKey,
    });

    return (
        <ul
            id={'list-' + props.absoluteKey}
            style={{ listStyle: 'none', padding: 'unset', marginTop: '6px', border: 'none' }}>
            {fields.map((field, index) =>
                props.fromCollection ? (
                    <Box
                        key={field.id}
                        background={'surface-default'}
                        padding={'6'}
                        borderRadius={'large'}
                        borderWidth="2"
                        borderColor={'border-subtle'}
                        style={{ marginBottom: '16px' }}>
                        <li
                            id={'list-item-' + index}
                            style={{ paddingBottom: 'var(--a-spacing-3)' }}>
                            {props.fieldComponentCreator(index, props.absoluteKey + '.' + index)}
                        </li>
                    </Box>
                ) : (
                    <li
                        id={'list-item-' + index}
                        key={field.id}
                        style={{ paddingBottom: 'var(--a-spacing-3)' }}>
                        {props.fieldComponentCreator(index, props.absoluteKey + '.' + index)}
                    </li>
                )
            )}
            <HStack gap={'2'}>
                <IconButton
                    id={'add-icon'}
                    ariaLabel={'add'}
                    onClick={() => {
                        append(props.defaultValueCreator());
                    }}
                    icon={<PlusIcon />}
                    disabled={props.disabled}
                />
                {fields.length > 0 && (
                    <IconButton
                        id={'remove-icon'}
                        ariaLabel={'remove'}
                        onClick={() => {
                            const index = fields.length - 1;
                            remove(fields.length - 1);
                            if (props.onFieldClose) {
                                props.onFieldClose(index);
                            }
                        }}
                        disabled={props.disabled}
                        icon={<RemoveIcon sx={iconButtonSX} />}
                    />
                )}
            </HStack>
        </ul>
    );
};
export default ArrayComponent;
