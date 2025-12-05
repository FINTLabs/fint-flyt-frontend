import { FunctionComponent, ReactElement, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { Tag as AkselTag } from '@navikt/ds-react';
import { ValueType } from '../../../types/Metadata/IntegrationMetadata';
import { Tooltip } from '@navikt/ds-react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NumbersIcon from '@mui/icons-material/Numbers';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import DialpadIcon from '@mui/icons-material/Dialpad';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LinkIcon from '@mui/icons-material/Link';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import SwitchAccessShortcutRoundedIcon from '@mui/icons-material/SwitchAccessShortcutRounded';

export interface Props {
    name: string;
    description: string;
    value: string;
    type: string;
    tagKey: string;
}

const iconProps = { sx: { color: 'var(--a-text-subtle)' } };

const typeIcons: Record<string, ReactElement> = {
    [ValueType.STRING]: <TextFieldsRoundedIcon {...iconProps} />,
    [ValueType.FILE]: <FilePresentIcon {...iconProps} />,
    [ValueType.INTEGER]: <NumbersIcon {...iconProps} />,
    [ValueType.DATE]: <CalendarMonthIcon {...iconProps} />,
    [ValueType.PHONE]: <DialpadIcon {...iconProps} />,
    [ValueType.BOOLEAN]: <RuleRoundedIcon {...iconProps} />,
    [ValueType.EMAIL]: <AlternateEmailRoundedIcon {...iconProps} />,
    [ValueType.URL]: <LinkIcon {...iconProps} />,
    [ValueType.COLLECTION]: <FormatListNumberedIcon {...iconProps} />,
    [ValueType.VALUE_CONVERTING]: <SwitchAccessShortcutRoundedIcon {...iconProps} />,
};

export const DraggableTag: FunctionComponent<Props> = (props: Props) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: props.type,
        item: { ...props },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const getTypeIcon = useCallback(
        (type?: string) => typeIcons[type ?? ''] ?? <DragIndicatorIcon {...iconProps} />,
        []
    );

    return (
        <Tooltip content={props.name}>
            <AkselTag
                variant="neutral"
                icon={getTypeIcon(props.type)}
                ref={drag}
                style={{
                    opacity: isDragging ? 0.4 : 1,
                    width: 'fit-content',
                    cursor: 'move',
                    backgroundColor: 'white',
                    fontSize: 'small',
                    borderColor: 'var(--a-border-subtle)',
                }}>
                {`${props.name} - ${props.description}`}
            </AkselTag>
        </Tooltip>
    );
};
