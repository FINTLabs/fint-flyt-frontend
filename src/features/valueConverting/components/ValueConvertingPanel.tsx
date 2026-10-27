import { BodyShort, Box, Heading, HStack, Label, Table, VStack } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getDestinationDisplayName } from '../../../shared/util/tableUtil';
import { formatTimestampToReadableText } from '../../../shared/util/timeAndDateUtils';
import { IValueConverting } from '../types/ValueConverting';
import styles from './ValueConvertingPanel.module.css';

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

    const formatUserName = (type?: string, name?: string | null) => {
        if (type === 'USER' && name) return name;
        if (type === 'USER' && !name) return t('unknownUser');
        if (type === 'UNKNOWN') return t('unknown');
        if (type === 'SYSTEM') return t('system');
        return '-';
    };

    return (
        <Box
            id={'value-converting-panel-' + id}
            paddingBlock="8 12"
            paddingInline="8 12"
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
                        <Label textColor="subtle">{t('column.createdBy')}</Label>
                        <BodyShort>
                            {formatUserName(
                                existingValueConverting?.createdByActor?.type,
                                existingValueConverting?.createdBy
                            )}
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
                    <VStack>
                        <Label textColor="subtle">{t('column.modifiedBy')}</Label>
                        <BodyShort>
                            {formatUserName(
                                existingValueConverting?.lastModifiedByActor?.type,
                                existingValueConverting?.lastModifiedBy
                            )}
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
                    <Table size="small" className={styles.mapTable}>
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
                                            <Table.DataCell className={styles.wrapCell}>
                                                <BodyShort>{key}</BodyShort>
                                            </Table.DataCell>
                                            <Table.DataCell className={styles.wrapCell}>
                                                <BodyShort>{value as string}</BodyShort>
                                            </Table.DataCell>
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
