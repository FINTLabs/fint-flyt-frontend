import { Box, Detail } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
    path: string[];
}

function splitPath(chunkSize: number, path: string[]): string[][] {
    const result: string[][] = [];
    for (let i = 0; i < path.length; i += chunkSize) {
        result.push(path.slice(i, i + chunkSize));
    }
    return result;
}

const PathComponent: React.FunctionComponent<Props> = (props: { path: string[] }) => {
    return (
        <Box>
            {splitPath(4, props.path).map((pathChunk: string[], index: number) => {
                return <Detail key={index}>{pathChunk.join('/')}</Detail>;
            })}
        </Box>
    );
};
export default PathComponent;
