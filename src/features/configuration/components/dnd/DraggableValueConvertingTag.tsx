import * as React from 'react';

import { IValueConverting } from '../../../valueConverting/types/ValueConverting';
import { ValueType } from '../../types/Metadata/IntegrationMetadata';
import { DraggableTag } from './DraggableTag';

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
