import { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'

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

export interface TagProps {
    name: string,
    value: string,
    setValue?: Function
}

interface DropResult {
    name: string
}

export const Tag: FC<TagProps> = function Tag({ name, value, setValue }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DraggableTypes.TAG,
        item: {name, value, setValue},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {
                console.log(`You dropped ${item.name} with the tag ${item.value}!`)
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
