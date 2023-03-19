import {ClassNameMap} from "@mui/styles";
import * as React from "react";

interface Props {
    classes: ClassNameMap;
    path: string[];
}

function splitPath(chunkSize: number, path: string[]): string[][] {
    const result: string[][] = []
    for (let i = 0; i < path.length; i += chunkSize) {
        result.push(path.slice(i, i + chunkSize));
    }
    return result;
}


const PathComponent: React.FunctionComponent<Props> = (props: { classes: ClassNameMap; path: string[]; }) => {
    return <div>
        <p className={props.classes.path}>
            {
                splitPath(4, props.path)
                    .map((pathChunk: string[]) => {
                        return <>{pathChunk.join("/")}<br/></>
                    })
            }
        </p>
    </div>
}
export default PathComponent