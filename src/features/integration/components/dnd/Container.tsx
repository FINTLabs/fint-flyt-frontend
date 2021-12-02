import { FC, memo } from 'react'
import { Dropzone } from './Dropzone'
import { Tag } from './Tag'
import {Typography} from "@mui/material";

export const Container: FC = memo(function Container() {
    let leString = 'Hei'

    return (
        <div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                <Dropzone />
            </div>
            <Typography>{leString}</Typography>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                <Tag name="Fornavn" value="fornavn"/>
                <Tag name="Etternavn" value="etternavn"/>
                <Tag name="Fødselsnummer" value="fodselsnummer" />
            </div>
        </div>
    )
})

export default Container;