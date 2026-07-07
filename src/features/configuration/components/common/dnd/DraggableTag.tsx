import { Tag as AkselTag } from '@navikt/ds-react';
import { Tooltip } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';
import { useDrag } from 'react-dnd';

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
import { ValueType } from '../../../types/Metadata/IntegrationMetadata';
import styles from './DraggableTag.module.css';

export interface Props {
    name: string;
    description: string;
    value: string;
    type: string;
    tagKey: string;
}

const typeIcons: Record<string, ReactElement> = {
    [ValueType.STRING]: <TextFieldsRoundedIcon />,
    [ValueType.FILE]: <FilePresentIcon />,
    [ValueType.INTEGER]: <NumbersIcon />,
    [ValueType.DATE]: <CalendarMonthIcon />,
    [ValueType.PHONE]: <DialpadIcon />,
    [ValueType.BOOLEAN]: <RuleRoundedIcon />,
    [ValueType.EMAIL]: <AlternateEmailRoundedIcon />,
    [ValueType.URL]: <LinkIcon />,
    [ValueType.COLLECTION]: <FormatListNumberedIcon />,
    [ValueType.VALUE_CONVERTING]: <SwitchAccessShortcutRoundedIcon />,
};

export const DraggableTag: FunctionComponent<Props> = ({
    name,
    description,
    type,
    ...rest
}: Props) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: {
            name,
            description,
            type,
            ...rest,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const icon = typeIcons[type] ?? <DragIndicatorIcon />;

    return (
        <Tooltip content={name} placement="right">
            <AkselTag
                size={'medium'}
                ref={drag}
                variant="neutral"
                icon={icon}
                className={`${styles.tag} ${isDragging ? styles.dragging : styles.notDragging}`}
            >
                {name} - {description}
            </AkselTag>
        </Tooltip>
    );
};
