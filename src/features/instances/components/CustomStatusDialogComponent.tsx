import * as React from "react";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {IEvent} from "../types/Event";
import {Alert, Button, Modal, Select, TextField, VStack} from "@navikt/ds-react";
import {ISelectable} from "../../configuration/types/Selectable";
import EventRepository from "../../../api/EventRepository";

type Props = {
    row: IEvent,
    setOpenCustomDialog: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

const CustomStatusDialogComponent: React.FunctionComponent<Props> = (props: Props) => {
    const ref = useRef<HTMLDialogElement>(null);
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'});
    const [status, setStatus] = useState<string>(props.row.name)
    const [destinationId, setDestinationId] = useState<string | undefined>(undefined)
    const [error, setError] = useState<boolean>(false)

    const createEvent = (instance: IEvent) => {
        EventRepository.createEvent(instance)
            .then(response => {
                console.log('created event', response)
            })
            .catch(e => {
                console.error(e)
            })
    }

    const updateStatus = (instance: IEvent, status: string, destinationId: string | undefined) => {
        instance.name = status;
        instance.applicationId = 'fint-flyt-frontend'
        instance.type = 'INFO'
        instance.timestamp = new Date().toISOString()

        if (status === 'instance-overridden' && !destinationId) {
            setError(true)
        }
        else if (status === 'instance-overridden' && destinationId) {
            instance.instanceFlowHeaders.archiveInstanceId = destinationId
            /* createEvent(instance) */
            props.setOpenCustomDialog(false)
        }
        if (instance && status === 'instance-overridden-rejected') {
            /* createEvent(instance) */
            props.setOpenCustomDialog(false)
        } else {
            setError(true)
        }

    }


    const instanceStatuses: ISelectable[] = [
        {displayName: t(props.row.name), value: props.row.name},
        {displayName: t('instance-overridden'), value: 'instance-overridden'},
        {displayName: t('instance-overridden-rejected'), value: 'instance-overridden-rejected'}
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
                               disabled={status !== 'instance-overridden'}
                               description={t('dialog.destinationIdDesc')}
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