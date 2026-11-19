import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    comment?: string | null;
    open: boolean;
    onClose: () => void;
};

const InstanceEventCommentDialog: React.FunctionComponent<Props> = ({
    comment,
    open,
    onClose,
}: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });

    if (!comment) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            header={{
                heading: t('dialog.comment'),
            }}
            width="medium"
        >
            <Modal.Body>
                <BodyLong style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                    {comment}
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={onClose} size="small">
                    {t('button.close')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InstanceEventCommentDialog;
