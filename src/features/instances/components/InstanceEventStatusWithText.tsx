import * as React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyShort, HStack, Tooltip, VStack } from '@navikt/ds-react';
import {
    PersonPencilFillIcon,
    CheckmarkCircleFillIcon,
    XMarkOctagonFillIcon,
    InformationSquareFillIcon,
    MinusCircleIcon,
} from '@navikt/aksel-icons';

type InstanceEventStatusWithTextProps = {
    event: string;
    errorLink: React.ReactNode | undefined;
};

type InstanceStatusWithTextProps = {
    status: string;
};

type IconProps = {
    text: string;
};

const errorEvents = new Set([
    'FAILED',
    'ERROR',
    'INSTANCE_RECEIVAL_ERROR',
    'INSTANCE_DISPATCHING_ERROR',
    'INSTANCE_MAPPING_ERROR',
]);

const ErrorIcon = ({ text }: IconProps) => (
    <XMarkOctagonFillIcon color="var(--a-icon-danger)" title={text} fontSize="1.5rem" />
);

const SuccessIcon = ({ text }: IconProps) => (
    <CheckmarkCircleFillIcon color="var(--a-icon-success)" title={text} fontSize="1.5rem" />
);

const InfoIcon = ({ text }: IconProps) => (
    <InformationSquareFillIcon title={text} fontSize="1.5rem" color="var(--a-icon-info)" />
);

const CancelIcon = ({ text }: IconProps) => (
    <MinusCircleIcon title={text} fontSize="1.5rem" color="var(--a-icon-subtle)" />
);

const ManuallyProcessedIcon = ({ text, success }: IconProps & { success: boolean }) => (
    <PersonPencilFillIcon
        title={text}
        fontSize="1.5rem"
        color={success ? 'var(--a-icon-success)' : 'var(--a-icon-subtle)'}
    />
);

const StatusIcon = ({ status, text }: { status: string; text: string }) => {
    if (status === 'FAILED' || status === 'ERROR') {
        return <ErrorIcon text={text} />;
    } else if (status === 'TRANSFERRED' || status === 'SUCCESS') {
        return <SuccessIcon text={text} />;
    } else if (status === 'ABORTED') {
        return <CancelIcon text={text} />;
    } else if (status === 'INSTANCE_MANUALLY_PROCESSED') {
        return <ManuallyProcessedIcon text={text} success={true} />;
    } else if (status === 'INSTANCE_MANUALLY_REJECTED') {
        return <ManuallyProcessedIcon text={text} success={false} />;
    } else {
        return <InfoIcon text={text} />;
    }
};

const InstanceStatusWithTooltip = ({ status }: InstanceStatusWithTextProps) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const text = useMemo(() => t(status), []);

    return (
        <Tooltip content={text}>
            <VStack align={'center'}>
                <StatusIcon status={status} text={text} />
            </VStack>
        </Tooltip>
    );
};

const InstanceEventStatusWithText = ({ event, errorLink }: InstanceEventStatusWithTextProps) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const eventText = useMemo(() => t(`filter.associatedEventNames.${event}`), [event]);

    const eventIconType = useMemo(() => {
        if (errorEvents.has(event)) {
            return 'ERROR';
        } else if (event === 'INSTANCE_DISPATCHED') {
            return 'SUCCESS';
        } else {
            return event;
        }
    }, [event]);

    return (
        <HStack align={'center'} gap={'2'}>
            <StatusIcon status={eventIconType} text={eventText} />
            <BodyShort>
                {eventText} {errorLink}
            </BodyShort>
        </HStack>
    );
};

export { InstanceEventStatusWithText, InstanceStatusWithTooltip };
