import * as React from "react";
import {ReactElement} from "react";
import PathComponent from "../common/PathComponent";
import {Box, Heading} from "@navikt/ds-react";

export interface Props {
    index: number;
    title: string;
    path: string[];
    content: ReactElement;
}

const ColumnElementComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <Box id={'column-item-' + props.index + '-' + props.title} style={{
        backgroundColor: '#EBF4F5',
        marginTop: '8px',
        border: '1px solid lightgrey',
        borderRadius: '4px',
        minWidth: '416px',
    }}>
        <Box padding={'4'}>
            <Box>
                <Heading size={"xsmall"} style={{marginBottom: '8px'}}>{props.title}</Heading>
                {props.path.length > 0 && <PathComponent path={props.path}/>}
            </Box>
            {props.content}
        </Box>
    </Box>
}
export default ColumnElementComponent;