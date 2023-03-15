import * as React from "react";
import {ReactElement, useEffect} from "react";

interface Props {
    onCreate?: () => void,
    onDestroy?: () => void,
    content: ReactElement
}

const LifeCycleComponent: React.FunctionComponent<Props> = (props: Props) => {
    useEffect(() => {
        if (props.onCreate) {
            props.onCreate()
        }
        return () => {
            if (props.onDestroy) {
                props.onDestroy()
            }
        }
    }, [])
    return <>
        {props.content}
    </>
}
export default LifeCycleComponent