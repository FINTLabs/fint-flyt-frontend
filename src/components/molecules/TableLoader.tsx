import { Skeleton, Table } from '@navikt/ds-react';
import * as React from 'react';

type TableLoaderProps = {
    columnLength: number;
    type?: 'row' | 'cell';
};

const TableLoader = ({ columnLength, type = 'row' }: TableLoaderProps) => {
    if (type === 'row') {
        return (
            <>
                <Table.Row>
                    <Table.DataCell colSpan={columnLength} style={{ textAlign: 'center' }}>
                        <Skeleton variant="rectangle" width="100%" />
                    </Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell colSpan={columnLength} style={{ textAlign: 'center' }}>
                        <Skeleton variant="rectangle" width="100%" />
                    </Table.DataCell>
                </Table.Row>
                <Table.Row>
                    <Table.DataCell colSpan={columnLength} style={{ textAlign: 'center' }}>
                        <Skeleton variant="rectangle" width="100%" />
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
