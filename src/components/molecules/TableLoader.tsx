import { Box, Skeleton, Table } from '@navikt/ds-react';
import * as React from 'react';

type TableLoaderProps = {
    columnLength: number;
    type?: 'row' | 'cell';
    tableSize?: 'medium' | 'small';
};

const TableLoader = ({ columnLength, type = 'row', tableSize = 'medium' }: TableLoaderProps) => {
    if (type === 'row') {
        return (
            <>
                <Table.Row>
                    <Table.DataCell colSpan={columnLength} style={{ textAlign: 'center' }}>
                        <Box paddingBlock={tableSize === 'small' ? '2' : '0'}>
                            <Skeleton variant="rectangle" width="100%" />
                        </Box>
                    </Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell colSpan={columnLength} style={{ textAlign: 'center' }}>
                        <Box paddingBlock={tableSize === 'small' ? '2' : '0'}>
                            <Skeleton variant="rectangle" width="100%" />
                        </Box>
                    </Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell colSpan={columnLength} style={{ textAlign: 'center' }}>
                        <Box paddingBlock={tableSize === 'small' ? '2' : '0'}>
                            <Skeleton variant="rectangle" width="100%" />
                        </Box>
                    </Table.DataCell>
                </Table.Row>
            </>
        );
    }

    return (
        <>
            <Table.Row>
                {[...Array(columnLength).keys()].map(() => (
                    <Table.DataCell style={{ textAlign: 'center' }}>
                        <Skeleton variant={'rectangle'} width="100%" />
                    </Table.DataCell>
                ))}
            </Table.Row>
            <Table.Row>
                {[...Array(columnLength).keys()].map(() => (
                    <Table.DataCell style={{ textAlign: 'center' }}>
                        <Skeleton variant={'rectangle'} width="100%" />
                    </Table.DataCell>
                ))}
            </Table.Row>
            <Table.Row>
                {[...Array(columnLength).keys()].map(() => (
                    <Table.DataCell style={{ textAlign: 'center' }}>
                        <Skeleton variant={'rectangle'} width="100%" />
                    </Table.DataCell>
                ))}
            </Table.Row>
        </>
    );
};

export default TableLoader;
