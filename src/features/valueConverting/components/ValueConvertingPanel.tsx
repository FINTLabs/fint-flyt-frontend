import { BodyShort, Box, Heading, HGrid, HStack, Label, Table, VStack } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { IValueConverting } from '../types/ValueConverting';
import { getDestinationDisplayName } from '../../../shared/util/TableUtil';
import { formatTimestampToReadableText } from '../../../shared/util/TimeAndDateUtils';

type Props = {
    id: number;
    existingValueConverting: IValueConverting | undefined;
    fromApplicationDisplayName: string;
};

export const ValueConvertingPanel: React.FunctionComponent<Props> = ({
    id,
    existingValueConverting,
    fromApplicationDisplayName,
}: Props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });

    return (
        <Box
            id={'value-converting-panel-' + id}
            paddingBlock="8 12"
            paddingInline="8 12"
            padding="4"
            background="surface-subtle"
            borderRadius="medium"
            marginBlock="0 12"
            marginInline="10"
        >
            <VStack gap="6">
                <HStack gap="12">
                    <VStack>
                        <Label textColor="subtle">{t('column.fromApplication')}</Label>
                        <BodyShort>{fromApplicationDisplayName}</BodyShort>
                    </VStack>
                    <VStack>
                        <Label textColor="subtle">{t('column.toApplication')}</Label>
                        <BodyShort>
                            {getDestinationDisplayName(
                                existingValueConverting?.toApplicationId ?? ''
                            )}
                        </BodyShort>
                    </VStack>
                    <VStack>
                        <Label textColor="subtle">{t('column.createdAt')}</Label>
                        <BodyShort>
                            {existingValueConverting?.createdAt
                                ? formatTimestampToReadableText(
                                      existingValueConverting?.createdAt ?? '',
                                      i18n.language,
                                      false,
                                      'numeric'
                                  )
                                : '-'}
                        </BodyShort>
                    </VStack>
                    <VStack>
                        <Label textColor="subtle">{t('column.modifiedAt')}</Label>
                        <BodyShort>
                            {existingValueConverting?.lastModifiedAt
                                ? formatTimestampToReadableText(
                                      existingValueConverting?.lastModifiedAt ?? '',
                                      i18n.language,
                                      false,
                                      'numeric'
                                  )
                                : '-'}
                        </BodyShort>
                    </VStack>
                </HStack>

                <Box
                    as="hr"
                    borderColor="border-default"
                    borderWidth="0 0 1 0"
                    margin="0"
                    width="100%"
                />

                <VStack>
                    <Heading id={'value-converting-panel-heading'} size={'xsmall'} spacing>
                        {t('convertingMap')}
                    </Heading>
                    <Table size="small">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell scope="col" className="subtle-text">
                                    {t('from')}
                                </Table.HeaderCell>
                                <Table.HeaderCell scope="col" className="subtle-text">
                                    {t('to')}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Object.entries(existingValueConverting?.convertingMap ?? {}).map(
                                ([key, value], i) => {
                                    return (
                                        <Table.Row key={i}>
                                            <Table.DataCell>{key}</Table.DataCell>
                                            <Table.DataCell>{value as string}</Table.DataCell>
                                        </Table.Row>
                                    );
                                }
                            )}
                        </Table.Body>
                    </Table>
                </VStack>
            </VStack>
        </Box>
    );
};

export default ValueConvertingPanel;
