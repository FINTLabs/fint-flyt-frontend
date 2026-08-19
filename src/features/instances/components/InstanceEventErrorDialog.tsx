import { Alert, BodyLong, Box, Button, List, Modal, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorArgs, getErrorDisplayParts } from '../../../shared/util/StringUtil';
import { IError } from '../types/Event';

type Props = {
    errors?: IError[] | undefined;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    isScrubbed?: boolean;
};

const ErrorMessageContent = ({
    error,
    translate,
}: {
    error: IError;
    translate: (key: string) => string;
}) => {
    const { intro, detail } = getErrorDisplayParts(translate(error.errorCode), getErrorArgs(error));

    if (!detail) {
        return <BodyLong>{intro}</BodyLong>;
    }

    return (
        <VStack gap="3">
            <BodyLong>{intro}</BodyLong>
            <Box padding="3" background="surface-subtle" borderRadius="medium">
                <BodyLong style={{ whiteSpace: 'pre-wrap' }}>{detail}</BodyLong>
            </Box>
        </VStack>
    );
};

const InstanceEventErrorDialog: React.FunctionComponent<Props> = ({
    errors,
    open,
    setOpen,
    isScrubbed,
}: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });

    const headerTitle = useMemo(() => {
        if (isScrubbed) {
            return t('scrubbedErrorTitle');
        }
        return errors && errors.length > 1 ? t('errors') : t('oneError');
    }, [errors, isScrubbed, t]);

    const hasContent = isScrubbed || (errors && errors.length > 0);

    return (
        <>
            {hasContent && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    header={{
                        heading: headerTitle,
                        closeButton: false,
                    }}
                    width="medium"
                >
                    <Modal.Body>
                        <Box>
                            {isScrubbed ? (
                                <Alert variant="info">{t('scrubbedErrorMessage')}</Alert>
                            ) : errors?.length === 1 ? (
                                <ErrorMessageContent error={errors[0]} translate={t} />
                            ) : (
                                <List as="ol" id={'error-list'}>
                                    {errors?.map((error: IError, index: number) => (
                                        <List.Item
                                            id={'error'}
                                            key={index}
                                            style={{ marginBlock: 'var(--a-spacing-4)' }}
                                        >
                                            <ErrorMessageContent error={error} translate={t} />
                                        </List.Item>
                                    ))}
                                </List>
                            )}
                        </Box>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" onClick={() => setOpen(false)}>
                            {t('button.close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default InstanceEventErrorDialog;
