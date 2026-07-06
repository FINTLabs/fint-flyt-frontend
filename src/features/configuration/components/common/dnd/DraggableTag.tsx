import { FunctionComponent, ReactElement, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { Tag as AkselTag } from '@navikt/ds-react';
import { ValueType } from '../../../types/Metadata/IntegrationMetadata';
import { Tooltip } from '@navikt/ds-react';
import styles from "./DraggableTag.module.css"
import {
    AlternateEmailRoundedIcon,
    CalendarMonthIcon,
    DialpadIcon,
    DragIndicatorIcon,
    FilePresentIcon,
    FormatListNumberedIcon,
    LinkIcon,
    NumbersIcon,
    RuleRoundedIcon,
    SwitchAccessShortcutRoundedIcon,
    TextFieldsRoundedIcon,
} from '../../../../../components/icons';

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
                className={`${styles.tag} ${isDragging ? styles.dragging : styles.notDragging}`}
            >
                {`${props.name} - ${props.description}`}
            </AkselTag>
        </Tooltip>
    );
};
