import * as React from "react";
import {Box, Detail} from "@navikt/ds-react";

interface Props {
    path: string[];
}

function splitPath(chunkSize: number, path: string[]): string[][] {
    const result: string[][] = []
    for (let i = 0; i < path.length; i += chunkSize) {
        result.push(path.slice(i, i + chunkSize));
    }
    return result;
}


const PathComponent: React.FunctionComponent<Props> = (props: { path: string[]; }) => {
    return <Box style={{marginTop: '-16px', marginBottom: '16px'}}>
        {
            splitPath(4, props.path)
                .map((pathChunk: string[], index: number) => {
                    return <Detail style={{margin: 0}} key={index}>{pathChunk.join("/")}</Detail>
                })
        }
    </Box>
}
export default PathComponent