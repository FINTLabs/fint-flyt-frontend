import * as React from "react";
import {Box, Typography} from "@mui/material";
import {stringReplace} from "../../util/StringUtil";
import {ErrorType} from "../../log/types/ErrorType";
import {IEvent} from "../../log/types/Event";
import {useTranslation} from "react-i18next";
import {dialogSX} from "../../configuration/styles/SystemStyles";

type Props = {
    row: IEvent | undefined
}

const DialogContentComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'});

    return (
        <>
            {props.row &&
                <Box id={props.row.type + `-panel`} sx={dialogSX}>
                    <Typography>{props.row.errors.length > 1 ? "Feilmeldinger:" : "Feilmelding:"}</Typography>
                    <ol style={{fontFamily: 'sans-serif'}}>
                        {props.row.errors.map((error: any, index: number) => {
                            return <li key={index}>
                                <Typography>
                                    {stringReplace(t(error.errorCode), [
                                        {
                                            type: ErrorType.INSTANCE_FIELD_KEY,
                                            value: error.instanceFieldKey
                                        },
                                        {type: ErrorType.FIELD_PATH, value: error.args.fieldPath},
                                        {
                                            type: ErrorType.ERROR_MESSAGE,
                                            value: error.args.errorMessage
                                        },
                                    ])
                                    }
                                </Typography>
                            </li>
                        })}
                    </ol>
                </Box>}
        </>
    )
}

export default DialogContentComponent;
