import {
    Button,
    InlineMessage,
    Modal,
    Select,
    Textarea,
    TextField,
    VStack,
} from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useInstanceFlowTrackingRepository from '../../../shared/api/useInstanceFlowTrackingRepository';
import { IEventNew } from '../types/Event';

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
    const [comment, setComment] = useState<string | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);

    const createDispatchEvent = (
        instance: IEventNew,
        archiveInstanceId: string,
        comment?: string
    ) => {
        InstanceFlowTrackingRepository.manualDispatchEvent(
            instance.sourceApplicationInstanceId,
            instance.sourceApplicationId,
            archiveInstanceId,
            instance.sourceApplicationIntegrationId,
            comment
        )
            .then((response) => {
                console.log('created event', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const createRejectEvent = (instance: IEventNew, comment?: string) => {
        InstanceFlowTrackingRepository.manualRejectEvent(
            instance.sourceApplicationInstanceId,
            instance.sourceApplicationId,
            instance.sourceApplicationIntegrationId,
            comment
        )
            .then((response) => {
                console.log('created event', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const createTransferredEvent = (instance: IEventNew, comment?: string) => {
        InstanceFlowTrackingRepository.manualTransferEvent(
            instance.sourceApplicationInstanceId,
            instance.sourceApplicationId,
            instance.sourceApplicationIntegrationId,
            comment
        )
            .then((response) => {
                console.log('created event', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const updateStatus = (
        instance: IEventNew,
        status: string,
        destinationId?: string,
        comment?: string
    ) => {
        if (status === 'instance-manually-processed' && !destinationId) {
            setError(true);
        } else if (status === 'instance-manually-processed' && destinationId) {
            createDispatchEvent(instance, destinationId, comment);
            props.setOpenCustomDialog(false);
        } else if (status === 'instance-status-overridden-as-transferred') {
            createTransferredEvent(instance, comment);
            props.setOpenCustomDialog(false);
        }
        if (instance && status === 'instance-manually-rejected') {
            createRejectEvent(instance, comment);
            props.setOpenCustomDialog(false);
        } else {
            setError(true);
        }
    };

    const manualStatuses = [
        'instance-manually-processed',
        'instance-manually-rejected',
        'instance-status-overridden-as-transferred',
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
                    <InlineMessage status="warning">{t('dialog.warning')}</InlineMessage>

                    <Select
                        label={t('dialog.status')}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value={props.row.displayName || 'Feilet'}>
                            {t(props.row.status)}
                        </option>
                        {manualStatuses.map((statusValue, i) => {
                            return (
                                <option key={i} value={statusValue}>
                                    {t(statusValue)}
                                </option>
                            );
                        })}
                    </Select>
                    {status === 'instance-manually-processed' && (
                        <TextField
                            label={t('dialog.destinationId')}
                            error={error && !destinationId && t('dialog.reqFieldMsg')}
                            disabled={status !== 'instance-manually-processed'}
                            description={t('dialog.destinationIdDesc')}
                            onChange={(e) => setDestinationId(e.target.value)}
                        />
                    )}

                    <Textarea
                        label={t('dialog.comment')}
                        description={t('dialog.commentDesc')}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={250}
                        error={comment && comment.length > 250}
                    />
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    size="small"
                    variant="danger"
                    disabled={!manualStatuses.includes(status)}
                    onClick={() => {
                        updateStatus(props.row, status, destinationId, comment);
                    }}
                >
                    {t('dialog.confirm')}
                </Button>
                <Button
                    type="button"
                    size="small"
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
