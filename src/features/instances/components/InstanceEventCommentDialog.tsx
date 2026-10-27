import { BodyLong, Box, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    comment?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InstanceEventCommentDialog: React.FunctionComponent<Props> = ({
    comment,
    open,
    setOpen,
}: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });

    if (!comment) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            header={{
                heading: t('dialog.comment'),
            }}
            width="medium"
        >
            <Modal.Body>
                <BodyLong style={{ whiteSpace: 'pre-wrap' }}>{comment}</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={() => setOpen(false)} size="small">
                    {t('button.close')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InstanceEventCommentDialog;
