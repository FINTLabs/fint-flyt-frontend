import { Tag as AkselTag } from '@navikt/ds-react';
import { Tooltip } from '@navikt/ds-react';
import { FunctionComponent, ReactElement, Ref } from 'react';
import { useDrag } from 'react-dnd';

import {
    EmailIcon,
    CalendarIcon,
    PhoneIcon,
    DragIndicatorIcon,
    FileIcon,
    NumberListIcon,
    LinkIcon,
    HashtagIcon,
    RuleIcon,
    SwitchAccessShortcutIcon,
    TextFieldsIcon,
} from '../../../../shared/components/icons';
import { ValueType } from '../../types/Metadata/IntegrationMetadata';
import styles from './DraggableTag.module.css';

export interface Props {
    name: string;
    description: string;
    value: string;
    type: string;
    tagKey: string;
}

const typeIcons: Record<string, ReactElement> = {
    [ValueType.STRING]: <TextFieldsIcon />,
    [ValueType.FILE]: <FileIcon />,
    [ValueType.INTEGER]: <HashtagIcon />,
    [ValueType.DATE]: <CalendarIcon />,
    [ValueType.PHONE]: <PhoneIcon />,
    [ValueType.BOOLEAN]: <RuleIcon />,
    [ValueType.EMAIL]: <EmailIcon />,
    [ValueType.URL]: <LinkIcon />,
    [ValueType.COLLECTION]: <NumberListIcon />,
    [ValueType.VALUE_CONVERTING]: <SwitchAccessShortcutIcon />,
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
                ref={drag as unknown as Ref<HTMLSpanElement>}
                variant="neutral"
                icon={icon}
                className={`${styles.tag} ${isDragging ? styles.dragging : styles.notDragging}`}
            >
                {name} - {description}
            </AkselTag>
        </Tooltip>
    );
};
