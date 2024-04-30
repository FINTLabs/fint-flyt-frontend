import * as React from "react";
import {useTranslation} from "react-i18next";
import {IError, IErrorArg, IEvent} from "../types/Event";
import {errorStringReplace, getErrorArgs} from "../../../util/StringUtil";
import {BodyShort, Box, Modal} from "@navikt/ds-react";
import {Button} from "@navikt/ds-react/esm/button";

type Props = {
    row: IEvent | undefined
    setOpenErrorDialog: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

const ErrorDialogComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'});

    return (
        <>
            {props.row &&
                <Modal open={props.open} header={{
                    heading: props.row?.errors?.length > 1 ? t('errors') : t('oneError'),
                    closeButton: false
                }}>
                    <Modal.Body>
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
                        </Box> </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" onClick={() => props.setOpenErrorDialog(false)}>
                            {t('button.close')}
                        </Button>
                    </Modal.Footer>
                </Modal>}
        </>
    )
}

export default ErrorDialogComponent;