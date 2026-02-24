import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { BodyLong, Box, Button, List, Modal } from '@navikt/ds-react';
import { ArrowsCirclepathIcon } from '@navikt/aksel-icons';
import { useTableSelect } from './TableSelectContext';
import useInstanceRepository from '../../../api/useInstanceRepository';

const BatchProcessButtonWithModal: FC = ({}) => {
    const InstanceRepository = useInstanceRepository();

    const ref = useRef<HTMLDialogElement>(null);
    const { selectedSize, selectedEvents } = useTableSelect();

    const [visible, setVisible] = useState(false);
    const runnableEvents = useMemo(() => {
        return Object.values(selectedEvents).filter(
            (event) => event.intermediateStorageStatus === 'STORED'
        );
    }, [selectedEvents]);

    useEffect(() => {
        if (
            Object.values(selectedEvents).some(
                (event) => event.intermediateStorageStatus === 'STORED'
            )
        ) {
            setVisible(true);
        }
    }, [selectedEvents]);

    const resendAllPossible = (instanceId: string) => {
        InstanceRepository.resendInstance(instanceId)
            .then((response) => {
                console.log('resend instance', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <Box>
            <Box style={{ display: visible ? 'block' : 'none' }}>
                <Button
                    type="button"
                    data-testid={'batch-process-button'}
                    variant={'secondary'}
                    icon={<ArrowsCirclepathIcon aria-hidden />}
                    onClick={() => ref.current?.showModal()}
                    disabled={selectedSize === 0}
                >
                    Prøv igjen
                </Button>
            </Box>
            <Modal
                ref={ref}
                size={'medium'}
                onClose={() => ref.current?.close()}
                header={{ heading: 'Batch watch' }}
            >
                <Modal.Body>
                    {selectedSize > runnableEvents.length && (
                        <BodyLong spacing>
                            Du har valgt {selectedSize} instanser, men det er kun{' '}
                            {runnableEvents.length} som kvalifiseres til å kunne kjøres på nytt.
                        </BodyLong>
                    )}
                    Dette er latestInstanceId som kan kjøres på nytt:
                    <List>
                        {runnableEvents.map((event) => {
                            return (
                                <List.Item key={event.latestInstanceId}>
                                    {event.latestInstanceId}
                                </List.Item>
                            );
                        })}
                    </List>
                    {selectedSize > runnableEvents.length && (
                        <BodyLong>
                            Det er kun disse instansene som vil bli kjørt på nytt. Alle de{' '}
                            resterende instansene vil ikke bli prossesert. Det er{' '}
                            {selectedSize - runnableEvents.length} instans
                            {selectedSize - runnableEvents.length > 1 ? 'er' : ''} som ikke vil bli
                            påvirket av denne handlingen.
                        </BodyLong>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            // handleClearFilters();
                            ref.current?.close();
                        }}
                    >
                        Nei, drit i
                    </Button>
                    <Button
                        onClick={() => {
                            // handleSaveFilter();
                            ref.current?.close();
                        }}
                    >
                        Gønn på!
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
};

export default BatchProcessButtonWithModal;
