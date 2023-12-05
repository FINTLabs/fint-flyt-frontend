import * as React from "react";
import {useTranslation} from "react-i18next";
import {IError, IErrorArg, IEvent} from "../types/Event";
import {errorStringReplace, getErrorArgs} from "../../../util/StringUtil";
import {BodyShort, Box} from "@navikt/ds-react";

type Props = {
    row: IEvent | undefined
}

const ErrorDialogComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'});

    return (
        <>
            {props.row &&
                <Box>
                    <ol id={'error-list'} style={{fontFamily: 'sans-serif'}}>
                        {props.row.errors.map((error: IError, index: number) => {
                            const errorArgs: IErrorArg[] = getErrorArgs(error)
                            return <li id={'error'} key={index}>
                                <BodyShort>
                                    {errorStringReplace(t(error.errorCode), errorArgs)}
                                </BodyShort>
                            </li>
                        })}
                    </ol>
                </Box>}
        </>
    )
}

export default ErrorDialogComponent;