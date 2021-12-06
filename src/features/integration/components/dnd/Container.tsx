import {FC, memo} from 'react'
import { Dropzone } from './Dropzone'
import { Tag } from './Tag'

export const Container: FC = memo(function Container() {
    let value = '{fornavn}'
    let value1 = '{etternavn}';
    let value2 = '{fodselsnummer}';

    return (
        <div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                <Dropzone/>
            </div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                <Tag value={value} name="Fornavn"/>
                <Tag value={value1} name="Etternavn"/>
                <Tag value={value2} name="Fødselsnummer" />
            </div>
        </div>
    )
})

export default Container;