import * as React from 'react';
import { ILink } from '../../features/dashboard/Link';
import { Box, Heading, Loader, VStack, BodyShort, HStack } from '@navikt/ds-react';
import { Link as RouterLink } from 'react-router';
import { useContext } from 'react';
import { IntegrationContext } from '../../context/IntegrationContext';
import { ArrowRightIcon } from '@navikt/aksel-icons';

type Props = {
    content: string;
    value: number | undefined;
    link?: ILink;
    id: string;
};

const DashboardCard: React.FunctionComponent<Props> = (props: Props) => {
    const { integrations } = useContext(IntegrationContext);

    return (
        <Box
            id="support-information"
            as="div"
            background="surface-default"
            borderRadius="large"
            borderWidth="1"
            borderColor="border-subtle"
            style={{
                justifyContent: 'center',
                textAlign: 'center',
                height: '150px',
                width: '100%',
            }}
        >
            <VStack gap={'2'} justify={'space-between'} height={'100%'}>
                <VStack height={'100%'} justify={'center'} align={'center'}>
                    {integrations ? (
                        <Heading
                            size="large"
                            textColor={!props.value || props.value === 0 ? 'subtle' : 'default'}
                        >
                            {props.value ?? 0}
                        </Heading>
                    ) : (
                        <Box paddingBlock={'1'}>
                            <Loader size="large" title="Venter..." transparent />
                        </Box>
                    )}
                    <Heading size="small">{props.content}</Heading>
                </VStack>
                {props.link && (
                    <Box
                        className="dashboard-card-link"
                        borderRadius={'0 0 large large'}
                        as={RouterLink}
                        to={props.link.href}
                        paddingInline={'4'}
                    >
                        <HStack
                            justify="center"
                            align="center"
                            height="100%"
                            width="100%"
                            style={{ position: 'relative' }}
                            wrap={false}
                            gap={'4'}
                        >
                            <BodyShort id={`${props.id}-btn`}>
                                {props.link.name}
                            </BodyShort>
                            <ArrowRightIcon className="arrow-icon" />
                        </HStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default DashboardCard;
