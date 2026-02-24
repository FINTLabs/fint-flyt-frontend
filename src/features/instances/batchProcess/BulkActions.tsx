import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ActionMenu, BodyLong, Box, Button, HStack, Modal, Table } from '@navikt/ds-react';
import {
    ArrowsCirclepathIcon,
    MenuElipsisVerticalIcon,
    ArrowCirclepathReverseIcon,
} from '@navikt/aksel-icons';
import { useTableSelect } from './TableSelectContext';
import useInstanceRepository from '../../../api/useInstanceRepository';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import { AuthorizationContext } from '../../../context/AuthorizationContext';
import { useTranslation } from 'react-i18next';
import TableLoader from '../../../components/molecules/TableLoader';

const BulkActions: FC = ({}) => {
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

        if (rerunIdList.length > 0) {
            InstanceRepository.resendInstances(rerunIdList)
                .then((response) => {
                    if (response.status === 200) {
                        removeAllEvents();
                        ref.current?.close();
                    }
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    return (
        <Box>
            <ActionMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <ActionMenu.Trigger>
                    <Button
                        data-color="neutral"
                        data-testid={'batch-process-button'}
                        variant="secondary-neutral"
                        icon={<MenuElipsisVerticalIcon aria-hidden />}
                        iconPosition="right"
                        className={'filter-toolbar-button'}
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
            <Modal
                ref={ref}
                size={'medium'}
                onClose={() => ref.current?.close()}
                header={{ heading: t('rerunModal.title') }}
            >
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
                        onClick={() => {
                            resendAllPossible();
                            ref.current?.close();
                        }}
                    >
                        {t('rerunModal.button.run')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
};

export default BulkActions;
