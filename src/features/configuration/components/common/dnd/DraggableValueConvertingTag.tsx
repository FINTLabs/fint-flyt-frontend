import * as React from 'react';
import { DraggableTag } from './DraggableTag';
import { ValueType } from '../../../types/Metadata/IntegrationMetadata';
import { IValueConverting } from '../../../../valueConverting/types/ValueConverting';

type ValueConvertingProps = {
    valueConverting: IValueConverting;
};
const DraggableValueConvertingTag: React.FunctionComponent<ValueConvertingProps> = ({
    valueConverting,
}: ValueConvertingProps) => {
    return (
        <DraggableTag
            value={'$vc{' + valueConverting.id.toString() + '}'}
            tagKey={valueConverting.displayName}
            name={valueConverting.displayName}
            description={'$vc{' + valueConverting.id.toString() + '}'}
            type={ValueType.VALUE_CONVERTING}
        />
    );
};
export default DraggableValueConvertingTag;
