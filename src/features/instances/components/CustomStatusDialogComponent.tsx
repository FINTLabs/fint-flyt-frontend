import * as React from 'react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IEventNew } from '../types/Event';
import { Alert, Button, Modal, Select, TextField, VStack } from '@navikt/ds-react';
import { ISelectable } from '../../configuration/types/Selectable';
import useInstanceFlowTrackingRepository from '../../../api/useInstanceFlowTrackingRepository';

type Props = {
    row: IEventNew;
    setOpenCustomDialog: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
};

const CustomStatusDialogComponent: React.FunctionComponent<Props> = (props: Props) => {
    const ref = useRef<HTMLDialogElement>(null);
    const InstanceFlowTrackingRepository = useInstanceFlowTrackingRepository();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [status, setStatus] = useState<string>(props.row.status);
    const [destinationId, setDestinationId] = useState<string | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);

    const createDispatchEvent = (instance: IEventNew, archiveInstanceId: string) => {
        InstanceFlowTrackingRepository.manualDispatchEvent(
            instance.sourceApplicationInstanceId,
            instance.sourceApplicationId,
            archiveInstanceId,
            instance.sourceApplicationIntegrationId
        )
            .then((response) => {
                console.log('created event', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const createRejectEvent = (instance: IEventNew) => {
        InstanceFlowTrackingRepository.manualRejectEvent(
            instance.sourceApplicationInstanceId,
            instance.sourceApplicationId,
            instance.sourceApplicationIntegrationId
        )
            .then((response) => {
                console.log('created event', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const createTransferredEvent = (instance: IEventNew) => {
        InstanceFlowTrackingRepository.manualTransferEvent(
            instance.sourceApplicationInstanceId,
            instance.sourceApplicationId,
            instance.sourceApplicationIntegrationId
        )
            .then((response) => {
                console.log('created event', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const updateStatus = (instance: IEventNew, status: string, destinationId?: string) => {
        // instance.name = status;
        // instance.type = 'INFO';
        // instance.timestamp = new Date().toISOString();

        if (status === 'instance-manually-processed' && !destinationId) {
            setError(true);
        } else if (status === 'instance-manually-processed' && destinationId) {
            createDispatchEvent(instance, destinationId);
            props.setOpenCustomDialog(false);
        } else if (status === 'instance-status-overridden-as-transferred') {
            createTransferredEvent(instance);
            props.setOpenCustomDialog(false);
        }
        if (instance && status === 'instance-manually-rejected') {
            createRejectEvent(instance);
            props.setOpenCustomDialog(false);
        } else {
            setError(true);
        }
    };

    const instanceStatuses: ISelectable[] = [
        { displayName: t(props.row.status), value: props.row.displayName || 'Feilet' },
        { displayName: t('instance-manually-processed'), value: 'instance-manually-processed' },
        { displayName: t('instance-manually-rejected'), value: 'instance-manually-rejected' },
        {
            displayName: t('instance-status-overridden-as-transferred'),
            value: 'instance-status-overridden-as-transferred',
        },
    ];

    return (
        <Modal
            open={props.open}
            ref={ref}
            header={{ heading: t('customStatus'), closeButton: false }}
            style={{ maxWidth: '500px' }}
            onClose={() => props.setOpenCustomDialog(false)}
        >
            <Modal.Body>
                <VStack gap={'4'}>
                    <Select
                        label={t('dialog.status')}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {instanceStatuses.map((status, i) => {
                            return (
                                <option key={i} value={status.value}>
                                    {status.displayName}
                                </option>
                            );
                        })}
                    </Select>
                    <TextField
                        label={t('dialog.destinationId')}
                        error={error && !destinationId && t('dialog.reqFieldMsg')}
                        disabled={status !== 'instance-manually-processed'}
                        description={t('dialog.destinationIdDesc')}
                        onChange={(e) => setDestinationId(e.target.value)}
                    />
                    <Alert variant="warning">{t('dialog.warning')}</Alert>
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                        updateStatus(props.row, status, destinationId);
                    }}
                >
                    {t('dialog.confirm')}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => props.setOpenCustomDialog(false)}
                >
                    {t('dialog.cancel')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomStatusDialogComponent;
