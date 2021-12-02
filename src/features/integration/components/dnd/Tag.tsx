import { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
    border: '1px  gray',
    backgroundColor: 'lightgrey',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

export interface BoxProps {
    name: string,
    value?: string
}

interface DropResult {
    name: string
}

export const Tag: FC<BoxProps> = function Tag({ name, value }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: {name, value},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                console.log(`You dropped ${item.name} ${item.value}  into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1
    return (
        <div
            ref={drag}
            role="Tag"
            style={{ ...style, opacity }}
            data-testid={`box-${name}`}
        >
            {name}
        </div>
    )
}
