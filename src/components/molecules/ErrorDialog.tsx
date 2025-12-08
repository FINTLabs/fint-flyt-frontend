import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IError, IErrorArg } from '../../features/instances/types/Event';
import { errorStringReplace, getErrorArgs } from '../../util/StringUtil';
import { BodyLong, Box, Button, Modal } from '@navikt/ds-react';

type Props = {
    errors?: IError[] | undefined;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
};

const ErrorDialog: React.FunctionComponent<Props> = ({ errors, open, setOpen }: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });

    return (
        <>
            {errors && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    header={{
                        heading: errors?.length > 1 ? t('errors') : t('oneError'),
                        closeButton: false,
                    }}>
                    <Modal.Body>
                        <Box>
                            <ol id={'error-list'} style={{ fontFamily: 'sans-serif' }}>
                                {errors.map((error: IError, index: number) => {
                                    const errorArgs: IErrorArg[] = getErrorArgs(error);
                                    return (
                                        <li id={'error'} key={index}>
                                            <BodyLong>
                                                {errorStringReplace(t(error.errorCode), errorArgs)}
                                            </BodyLong>
                                        </li>
                                    );
                                })}
                            </ol>
                        </Box>{' '}
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

export default ErrorDialog;
