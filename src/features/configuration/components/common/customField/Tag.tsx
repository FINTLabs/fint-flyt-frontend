import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrag } from 'react-dnd'

const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

export interface TagProps {
    name: string
    type: string
    isDropped: boolean
    collection?: boolean
}

// eslint-disable-next-line react/prop-types
export const Tag: FC<TagProps> = memo(function Tag({ name, type, collection, isDropped }) {
    const [{ opacity }, drag] = useDrag(
        () => ({
            type,
            item: { name, type, collection },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [name, type],
    )

    return (
        <div ref={drag} style={{ ...style, opacity }} data-testid="tag">
            {name}
        </div>
    )
})
