import { Box } from '@mui/system';
import type { CSSProperties, FC } from 'react'
import {memo, useState} from 'react'
import { useDrop } from 'react-dnd'
import {TagProps} from "./Tag";
import {Button} from "@navikt/ds-react";
import {Typography} from "@mui/material";

const style: CSSProperties = {
    height: '30vh',
    width: '50vw',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export interface CustomFieldProps {
    accept: string[]
    lastDroppedItem?: TagProps
    onDrop: (item: TagProps) => void
}

// eslint-disable-next-line react/prop-types
export const CustomField: FC<CustomFieldProps> = memo(function CustomField({accept, lastDroppedItem, onDrop}) {
    const [content, setContent] = useState<TagProps[]>([]);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: (item: TagProps) => {
            setContent([...content, item])
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = isOver && canDrop
    let backgroundColor = '#222'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    console.log(content)

    return (
        <Box>
            <div ref={drop} style={{ ...style, backgroundColor }} data-testid="custom-field">
                {isActive
                    ? 'Release to drop'
                    // eslint-disable-next-line react/prop-types
                    : `This custom field accepts: ${accept.join(', ')}`}

                <Typography>
                {JSON.stringify(content)}
                </Typography>
                {lastDroppedItem && (
                    <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
                )}
            </div>
            <Button onClick={() => setContent([])}>Fjern innhold</Button>
        </Box>
    )
})
