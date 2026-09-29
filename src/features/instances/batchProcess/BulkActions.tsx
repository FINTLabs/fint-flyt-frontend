import { ActionMenu, BodyLong, Button, HStack, Modal, Table } from '@navikt/ds-react';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useInstanceRepository from '../../../shared/api/useInstanceRepository';
import {
    ArrowCirclepathReverseIcon,
    ArrowsCirclepathIcon,
    MenuElipsisVerticalIcon,
} from '../../../shared/components/icons';
import TableLoader from '../../../shared/components/table/TableLoader';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { IAlertContent } from '../../../shared/types/AlertContent';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import { useTableSelect } from './TableSelectContext';

type Props = {
    onAlert: (content: IAlertContent) => void;
};

const BulkActions: FC<Props> = ({ onAlert }) => {
    const InstanceRepository = useInstanceRepository();
    const { getAllSourceApplications } = useContext(AuthorizationContext);

    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances.toolbar.actions' });

    const { selectedEvents, removeAllEvents, selectedSize } = useTableSelect();

    const ref = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>();

    useEffect(() => {
        if (ref?.current?.open && !sourceApplications?.length) {
            getAllSourceApplications(false).then((sourceApps) => setSourceApplications(sourceApps));
        }
    }, [ref?.current?.open]);

    const runnableEvents = useMemo(() => {
        return Object.values(selectedEvents).filter(
            (event) => event.intermediateStorageStatus === 'STORED' && event.status === 'FAILED'
        );
    }, [selectedEvents]);

    const resendAllPossible = () => {
        const rerunIdList: string[] = runnableEvents.flatMap((event) =>
            event.latestInstanceId != null ? [event.latestInstanceId] : []
        );

        if (rerunIdList.length === 0) {
            return;
        }

        const count = rerunIdList.length;
        ref.current?.close();
        removeAllEvents();
        onAlert({
            severity: 'success',
            message: t('rerunModal.alert.successTitle'),
            content: t('rerunModal.alert.successContent', { count }),
        });

        void InstanceRepository.resendInstances(rerunIdList).catch((e) => {
            console.error(e);
            onAlert({
                severity: 'error',
                message: t('rerunModal.alert.errorTitle'),
                content: t('rerunModal.alert.errorContent'),
            });
        });
    };

    return (
        <>
            <ActionMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <ActionMenu.Trigger>
                    <Button
                        data-color="neutral"
                        data-testid={'batch-process-button'}
                        variant="secondary-neutral"
                        icon={<MenuElipsisVerticalIcon aria-hidden />}
                        iconPosition="right"
                        className={'table-toolbar-button'}
                        size={'small'}
                    >
                        <HStack gap={'2'} wrap={false}>
                            {t('buttonText')}
                        </HStack>
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Item
                        icon={<ArrowsCirclepathIcon aria-hidden />}
                        onClick={() => ref.current?.showModal()}
                        disabled={selectedSize === 0}
                    >
                        {t('option.rerun')}
                    </ActionMenu.Item>
                    <ActionMenu.Divider />
                    <ActionMenu.Item
                        icon={<ArrowCirclepathReverseIcon />}
                        disabled={selectedSize === 0}
                        onSelect={removeAllEvents}
                    >
                        {t('option.resetSelected')}
                    </ActionMenu.Item>
                </ActionMenu.Content>
            </ActionMenu>
            <Modal ref={ref} size={'medium'} header={{ heading: t('rerunModal.title') }}>
                <Modal.Body>
                    {(!runnableEvents?.length || runnableEvents.length === 0) && (
                        <BodyLong>{t('rerunModal.noRunnableText')}</BodyLong>
                    )}

                    {runnableEvents.length > 0 && selectedSize > runnableEvents.length && (
                        <BodyLong spacing>
                            {t('rerunModal.descriptionText', {
                                totalSize: selectedSize,
                                runnableSize: runnableEvents.length,
                            })}
                        </BodyLong>
                    )}

                    {runnableEvents.length > 0 && (
                        <Table size="small">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader>
                                        {t('rerunModal.table.header.sourceApplication')}
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader>
                                        {t('rerunModal.table.header.intergationName')}
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader>
                                        {t(
                                            'rerunModal.table.header.sourceApplicationIntegrationId'
                                        )}
                                    </Table.ColumnHeader>
                                    <Table.ColumnHeader>
                                        {t('rerunModal.table.header.sourceApplicationInstanceId')}
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {!runnableEvents || !sourceApplications?.length ? (
                                    <TableLoader columnLength={10} />
                                ) : (
                                    runnableEvents.map((event, i) => {
                                        return (
                                            <Table.Row key={i} shadeOnHover={false}>
                                                <Table.DataCell>
                                                    {
                                                        sourceApplications?.find(
                                                            (sa) =>
                                                                sa.id === event.sourceApplicationId
                                                        )?.displayName
                                                    }
                                                </Table.DataCell>
                                                <Table.DataCell>{event.displayName}</Table.DataCell>
                                                <Table.DataCell>
                                                    {event.sourceApplicationIntegrationId}
                                                </Table.DataCell>
                                                <Table.DataCell>
                                                    {event.sourceApplicationInstanceId}
                                                </Table.DataCell>
                                            </Table.Row>
                                        );
                                    })
                                )}
                            </Table.Body>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={'secondary'}
                        type={'button'}
                        size={'small'}
                        onClick={() => {
                            ref.current?.close();
                        }}
                    >
                        {t('rerunModal.button.cancel')}
                    </Button>
                    <Button
                        size={'small'}
                        disabled={runnableEvents.length === 0}
                        onClick={resendAllPossible}
                    >
                        {t('rerunModal.button.run')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BulkActions;
