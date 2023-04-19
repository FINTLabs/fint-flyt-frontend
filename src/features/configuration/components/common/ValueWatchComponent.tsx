import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {useEffect} from "react";
import {useFormContext, useWatch} from "react-hook-form";

export type Props = {
    classes: ClassNameMap,
    names: string[],
    onValuesChange: (names: string[]) => void
}

const ValueWatchComponent: React.FunctionComponent<Props> = (props: Props) => {
    const values = useWatch({name: props.names})
    const {getValues} = useFormContext();
    useEffect(() => {
        props.onValuesChange(
            getValues(props.names)
        )
    }, [values])
    return <></>
}
export default ValueWatchComponent;