import * as React from "react";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {IEvent} from "../types/Event";
import {Alert, Button, Label, Modal, Select, TextField, VStack} from "@navikt/ds-react";
import {ISelectable} from "../../configuration/types/Selectable";

type Props = {
    row: IEvent,
    setOpenCustomDialog: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

const CustomStatusDialogComponent: React.FunctionComponent<Props> = (props: Props) => {
    const ref = useRef<HTMLDialogElement>(null);
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'});
    const [status, setStatus] = useState<string>('instance-status-overridden')
    const [destinationId, setDestinationId] = useState<string | undefined>(undefined)
    const [error, setError] = useState<boolean>(false)

    const updateStatus = (instance: IEvent, status: string, destinationId: string | undefined) => {
        if (instance && status && destinationId) {
            instance.name = status;
            instance.applicationId = 'fint-flyt-frontend'
            instance.instanceFlowHeaders.archiveInstanceId = destinationId
            instance.type = 'INFO'
            instance.timestamp = new Date().toISOString()
            console.log(instance)
            /* EventRepository.createEvent(instance)
                 .then(response => {
                     console.log('created event', response)
                 })
                 .catch(e => {
                     console.error(e)
                 })*/
            props.setOpenCustomDialog(false)

        } else {
            setError(true)
        }

    }


    const instanceStatuses: ISelectable[] = [
        {displayName: t(props.row.name), value: props.row.name},
        {displayName: t('instance-status-overridden'), value: 'instance-status-overridden'}
    ]

    return (
        <Modal open={props.open} ref={ref} header={{heading: t('customStatus'), closeButton: false}} style={{maxWidth: '500px'}}>
            <Modal.Body>
                <VStack gap={"4"}>
                    <Select label={t("dialog.status")} value={status} onChange={(e) => setStatus(e.target.value)}>
                        {instanceStatuses.map((status, i) => {
                            return <option key={i} value={status.value}>{status.displayName}</option>
                        })}
                    </Select>
                    <TextField label={t('dialog.destinationId')}
                               error={error && !destinationId && t('dialog.reqFieldMsg')}
                               onChange={(e) => setDestinationId(e.target.value)}/>
                    <Alert variant="warning">
                        {t('dialog.warning')}
                    </Alert>
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="danger" onClick={() => {
                    updateStatus(props.row, status, destinationId)
                }}>
                    {t('dialog.confirm')}
                </Button>
                <Button type="button" variant="secondary" onClick={() => props.setOpenCustomDialog(false)}
                >
                    {t('dialog.cancel')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomStatusDialogComponent;