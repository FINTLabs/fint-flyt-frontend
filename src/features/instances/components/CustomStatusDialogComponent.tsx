import {
    Button,
    InlineMessage,
    Modal,
    Select,
    Textarea,
    TextField,
    VStack,
} from '@navikt/ds-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useInstanceFlowTrackingRepository from '../../../shared/api/useInstanceFlowTrackingRepository';
import { IEventNew } from '../types/Event';

type Props = {
    row: IEventNew;
    onClose: () => void;
    onSaved: () => void;
};

const manualStatuses = [
    'instance-manually-processed',
    'instance-manually-rejected',
    'instance-status-overridden-as-transferred',
];

const CustomStatusDialogComponent = ({ row, onClose, onSaved }: Props) => {
    const { manualDispatchEvent, manualRejectEvent, manualTransferEvent } =
        useInstanceFlowTrackingRepository();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [status, setStatus] = useState('');
    const [destinationId, setDestinationId] = useState('');
    const [comment, setComment] = useState<string>();
    const [destinationIdMissing, setDestinationIdMissing] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [saving, setSaving] = useState(false);

    const saveStatus = async () => {
        if (!manualStatuses.includes(status) || saving) {
            return;
        }
        if (status === 'instance-manually-processed' && !destinationId) {
            setDestinationIdMissing(true);
            return;
        }

        const { sourceApplicationInstanceId, sourceApplicationId, sourceApplicationIntegrationId } =
            row;
        setSaving(true);
        setSaveError(false);
        try {
            switch (status) {
                case 'instance-manually-processed':
                    await manualDispatchEvent(
                        sourceApplicationInstanceId,
                        sourceApplicationId,
                        destinationId,
                        sourceApplicationIntegrationId,
                        comment
                    );
                    break;
                case 'instance-manually-rejected':
                    await manualRejectEvent(
                        sourceApplicationInstanceId,
                        sourceApplicationId,
                        sourceApplicationIntegrationId,
                        comment
                    );
                    break;
                case 'instance-status-overridden-as-transferred':
                    await manualTransferEvent(
                        sourceApplicationInstanceId,
                        sourceApplicationId,
                        sourceApplicationIntegrationId,
                        comment
                    );
                    break;
            }
            onSaved();
        } catch {
            setSaveError(true);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            open
            header={{ heading: t('customStatus'), closeButton: false }}
            style={{ maxWidth: '500px' }}
            onBeforeClose={() => !saving}
            onClose={onClose}
        >
            <Modal.Body>
                <VStack gap="4">
                    <InlineMessage status="warning">{t('dialog.warning')}</InlineMessage>

                    <Select
                        label={t('dialog.status')}
                        value={status}
                        disabled={saving}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">{t(row.status)}</option>
                        {manualStatuses.map((statusValue) => (
                            <option key={statusValue} value={statusValue}>
                                {t(statusValue)}
                            </option>
                        ))}
                    </Select>
                    {status === 'instance-manually-processed' && (
                        <TextField
                            label={t('dialog.destinationId')}
                            error={
                                destinationIdMissing && !destinationId && t('dialog.reqFieldMsg')
                            }
                            description={t('dialog.destinationIdDesc')}
                            value={destinationId}
                            disabled={saving}
                            onChange={(e) => setDestinationId(e.target.value)}
                        />
                    )}

                    <Textarea
                        label={t('dialog.comment')}
                        description={t('dialog.commentDesc')}
                        value={comment ?? ''}
                        disabled={saving}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {saveError && (
                        <InlineMessage status="error">{t('dialog.saveError')}</InlineMessage>
                    )}
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    size="small"
                    variant="danger"
                    loading={saving}
                    disabled={saving || !manualStatuses.includes(status)}
                    onClick={saveStatus}
                >
                    {t('dialog.confirm')}
                </Button>
                <Button
                    type="button"
                    size="small"
                    variant="secondary"
                    disabled={saving}
                    onClick={onClose}
                >
                    {t('dialog.cancel')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomStatusDialogComponent;
