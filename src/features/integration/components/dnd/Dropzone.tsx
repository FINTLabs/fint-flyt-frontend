import { CSSProperties, FC } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'black',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export const Dropzone: FC = () => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({ name: 'Dropzone' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const isActive = canDrop && isOver
    let backgroundColor = 'lightblue'
    if (isActive) {
        backgroundColor = 'lightpink'
    } else if (canDrop) {
        backgroundColor = 'lightgreen'
    }

    return (
        <div ref={drop} role={'Dropzone'} style={{ ...style, backgroundColor }}>
            {isActive ? 'Release to drop' : 'Drag a tag here'}
        </div>
    )
}
